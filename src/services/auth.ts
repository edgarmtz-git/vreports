import { ODOO_CONFIG, TEST_CREDENTIALS } from '@/config/env'

export interface User {
  id: number
  name: string
  email: string
  login: string
  partner_id: number
  groups_id: number[]
  company_id: number
  lang: string
  tz: string
}

export interface AuthResponse {
  jsonrpc: string
  id: number
  result: {
    uid: number
    is_admin: boolean
    user_context: {
      uid: number
      lang: string
      tz: string
      partner_id: number
      company_id: number
      groups_id: number[]
    }
    session_id: string
    db: string
    server_version: string
    server_version_info: number[]
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

class AuthService {
  private baseUrl: string
  private db: string

  constructor() {
    this.baseUrl = ODOO_CONFIG.URL
    this.db = ODOO_CONFIG.DB
  }

  /**
   * Autentica un usuario contra la API de Odoo
   */
  async authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
    const url = `${this.baseUrl}/web/session/authenticate`
    
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: this.db,
        login: credentials.email,
        password: credentials.password,
        base_location: `${this.baseUrl}/web`
      },
      id: 1
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include', // Importante para mantener las cookies de sesión
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message || 'Error de autenticación')
      }

      return data
    } catch (error) {
      console.error('Error en autenticación:', error)
      throw new Error('Error de conexión con el servidor Odoo')
    }
  }

  /**
   * Obtiene información del usuario autenticado
   */
  async getUserInfo(sessionId: string): Promise<User> {
    const url = `${this.baseUrl}/web/session/get_session_info`
    
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {},
      id: 1
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `session_id=${sessionId}`
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message || 'Error al obtener información del usuario')
      }

      return data.result
    } catch (error) {
      console.error('Error al obtener información del usuario:', error)
      throw new Error('Error al obtener información del usuario')
    }
  }

  /**
   * Verifica si las credenciales de prueba son válidas
   */
  async validateTestCredentials(): Promise<boolean> {
    try {
      await this.authenticate({
        email: TEST_CREDENTIALS.USER,
        password: TEST_CREDENTIALS.PASSWORD
      })
      return true
    } catch {
      return false
    }
  }

  /**
   * Cierra la sesión en Odoo
   */
  async logout(sessionId: string): Promise<void> {
    const url = `${this.baseUrl}/web/session/destroy`
    
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {},
      id: 1
    }

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `session_id=${sessionId}`
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
}

export const authService = new AuthService()
