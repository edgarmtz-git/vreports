import { Routes, Route } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

// Pages
import SignIn from "@/pages/auth/sign-in"
import Dashboard from "@/pages/dashboard"

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-10
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2 lg:hidden mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold">VReportes</h1>
            </div>
          </div>
          
          {/* User info and logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-600">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/capacitaciones" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Capacitaciones</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/servicios-industriales" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Servicios Industriales</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment-report" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Reporte de Pagos</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tables" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Tablas</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Perfil</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="*" 
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
                <p className="text-gray-600">La página que buscas no existe</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
