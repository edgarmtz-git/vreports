// 🔗 Configuración de Odoo
export const ODOO_CONFIG = {
  URL: import.meta.env.VITE_ODOO_URL || 'https://fexs.mx',
  DB: import.meta.env.VITE_ODOO_DB || 'Productiva',
}

// 🗄️ Base de datos de Odoo (para consultas de ventas)
export const DB_CONFIG = {
  HOST: import.meta.env.VITE_DB_HOST || '98.80.84.181',
  PORT: import.meta.env.VITE_DB_PORT || '5432',
  NAME: import.meta.env.VITE_DB_NAME || 'Productiva',
  USER: import.meta.env.VITE_DB_USER || 'odoo16',
  PASSWORD: import.meta.env.VITE_DB_PASSWORD || 'z14K7uN1',
}

// 🔐 JWT
export const JWT_CONFIG = {
  SECRET: import.meta.env.VITE_JWT_SECRET || 'tu-clave-secreta-jwt-super-segura',
}

// 👤 Credenciales de prueba (opcional)
export const TEST_CREDENTIALS = {
  USER: import.meta.env.VITE_TEST_USER || 'soporte.tecnico@varcus.com.mx',
  PASSWORD: import.meta.env.VITE_TEST_PASSWORD || 'z14K7uN1',
}

// 🌐 Puerto del servidor
export const SERVER_CONFIG = {
  PORT: import.meta.env.VITE_PORT || '8080',
}

// 🗄️ URL de conexión a la base de datos
export const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || 'postgresql://odoo16:z14K7uN1@98.80.84.181:5432/Productiva'
