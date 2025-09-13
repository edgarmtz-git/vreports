import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService, User, LoginCredentials } from '@/services/auth'
import { generateJWT, storeToken, removeToken, getUserFromToken, JWTPayload } from '@/utils/jwt'
import { TEST_CREDENTIALS } from '@/config/env'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokenPayload = getUserFromToken()
        if (tokenPayload) {
          // Verificar que la sesión sigue siendo válida
          const userInfo = await authService.getUserInfo(tokenPayload.sessionId)
          setUser(userInfo)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        // Si hay error, limpiar el token
        removeToken()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Iniciando autenticación con:', credentials.email)
      
      // Para testing, usar autenticación simplificada
      if (credentials.email === TEST_CREDENTIALS.USER && credentials.password === TEST_CREDENTIALS.PASSWORD) {
        console.log('Usando credenciales de prueba')
        
        // Crear usuario mock para testing
        const mockUser = {
          id: 1,
          name: 'Usuario de Prueba',
          email: credentials.email,
          login: credentials.email,
          partner_id: 1,
          groups_id: [1],
          company_id: 1,
          lang: 'es_MX',
          tz: 'America/Mexico_City'
        }
        
        // Generar token JWT
        const token = generateJWT({
          uid: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          sessionId: 'mock-session-id'
        })

        // Almacenar token
        storeToken(token)
        
        // Actualizar estado
        setUser(mockUser)
        setIsAuthenticated(true)
        
        console.log('Autenticación exitosa, usuario:', mockUser)
        return
      }

      // Autenticar con Odoo (comentado temporalmente para testing)
      /*
      const authResponse = await authService.authenticate(credentials)
      
      if (authResponse.result.uid) {
        // Obtener información del usuario
        const userInfo = await authService.getUserInfo(authResponse.result.session_id)
        
        // Generar token JWT
        const token = generateJWT({
          uid: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          sessionId: authResponse.result.session_id
        })

        // Almacenar token
        storeToken(token)
        
        // Actualizar estado
        setUser(userInfo)
        setIsAuthenticated(true)
      } else {
        throw new Error('Credenciales inválidas')
      }
      */
      
      // Si no son las credenciales de prueba, mostrar error
      throw new Error('Credenciales incorrectas. Use las credenciales de prueba.')
      
    } catch (error) {
      console.error('Error en login:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error de autenticación'
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    
    try {
      const tokenPayload = getUserFromToken()
      if (tokenPayload) {
        await authService.logout(tokenPayload.sessionId)
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      // Limpiar estado local
      removeToken()
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
