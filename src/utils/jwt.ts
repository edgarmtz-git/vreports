import { JWT_CONFIG } from '@/config/env'

export interface JWTPayload {
  uid: number
  email: string
  name: string
  sessionId: string
  exp: number
  iat: number
}

/**
 * Genera un token JWT simple (para desarrollo)
 * En producción, usar una librería como jsonwebtoken
 */
export function generateJWT(payload: Omit<JWTPayload, 'exp' | 'iat'>): string {
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload: JWTPayload = {
    ...payload,
    exp: now + (24 * 60 * 60), // 24 horas
    iat: now
  }

  // Codificación base64 simple (NO usar en producción)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payloadEncoded = btoa(JSON.stringify(tokenPayload))
  const signature = btoa(JWT_CONFIG.SECRET + payloadEncoded)

  return `${header}.${payloadEncoded}.${signature}`
}

/**
 * Verifica y decodifica un token JWT
 */
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = JSON.parse(atob(parts[1])) as JWTPayload

    // Verificar expiración
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    console.error('Error al verificar JWT:', error)
    return null
  }
}

/**
 * Almacena el token en localStorage
 */
export function storeToken(token: string): void {
  localStorage.setItem('auth_token', token)
}

/**
 * Obtiene el token del localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem('auth_token')
}

/**
 * Elimina el token del localStorage
 */
export function removeToken(): void {
  localStorage.removeItem('auth_token')
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false

  const payload = verifyJWT(token)
  return payload !== null
}

/**
 * Obtiene la información del usuario del token
 */
export function getUserFromToken(): JWTPayload | null {
  const token = getToken()
  if (!token) return null

  return verifyJWT(token)
}
