# Sistema de Autenticación VReportes

## Configuración

Para configurar el sistema de autenticación, crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# 🔗 Configuración de Odoo
VITE_ODOO_URL=https://fexs.mx
VITE_ODOO_DB=Productiva

# 🗄️ Base de datos de Odoo (para consultas de ventas)
VITE_DB_HOST=98.80.84.181
VITE_DB_PORT=5432
VITE_DB_NAME=Productiva
VITE_DB_USER=odoo16
VITE_DB_PASSWORD=z14K7uN1

# 🔐 JWT
VITE_JWT_SECRET=tu-clave-secreta-jwt-super-segura

# 👤 Credenciales de prueba (opcional)
VITE_TEST_USER=soporte.tecnico@varcus.com.mx
VITE_TEST_PASSWORD=z14K7uN1

# 🌐 Puerto del servidor
VITE_PORT=8080

# 🗄️ URL de conexión a la base de datos
VITE_DATABASE_URL=postgresql://odoo16:z14K7uN1@98.80.84.181:5432/Productiva
```

## Características del Sistema

### 1. Autenticación con Odoo API
- Integración directa con la API de Odoo
- Autenticación mediante email y contraseña
- Manejo de sesiones con cookies
- Validación de credenciales en tiempo real

### 2. Gestión de Tokens JWT
- Generación de tokens JWT para mantener la sesión
- Almacenamiento seguro en localStorage
- Verificación automática de expiración
- Limpieza automática de tokens inválidos

### 3. Rutas Protegidas
- Todas las rutas del dashboard requieren autenticación
- Redirección automática al login si no está autenticado
- Preservación de la URL de destino después del login

### 4. Interfaz de Usuario
- Formulario de login con validación
- Botón para usar credenciales de prueba
- Indicadores de carga durante la autenticación
- Mensajes de error informativos
- Información del usuario en el header
- Botón de logout accesible

## Uso

### Login
1. Navega a `/auth/sign-in` o la página principal
2. Ingresa tu email y contraseña de Odoo
3. O usa el botón "Usar credenciales de prueba" para login rápido
4. El sistema te redirigirá al dashboard tras autenticación exitosa

### Logout
- Haz clic en el botón "Cerrar Sesión" en el header
- El sistema limpiará la sesión y te redirigirá al login

### Credenciales de Prueba
- Email: `soporte.tecnico@varcus.com.mx`
- Contraseña: `z14K7uN1`

## Arquitectura

### Servicios
- `AuthService`: Maneja la comunicación con la API de Odoo
- `JWT Utils`: Gestión de tokens JWT
- `AuthContext`: Estado global de autenticación

### Componentes
- `SignIn`: Formulario de login
- `ProtectedRoute`: Wrapper para rutas protegidas
- `AuthProvider`: Context provider para autenticación

### Flujo de Autenticación
1. Usuario ingresa credenciales
2. `AuthService` valida con Odoo API
3. Se genera token JWT con información del usuario
4. Token se almacena en localStorage
5. Usuario es redirigido al dashboard
6. `ProtectedRoute` verifica autenticación en cada navegación

## Seguridad

- Tokens JWT con expiración de 24 horas
- Validación de sesión en cada request
- Limpieza automática de tokens expirados
- Manejo seguro de errores de autenticación
- Credenciales no almacenadas en el frontend
