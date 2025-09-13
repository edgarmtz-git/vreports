import { Routes, Route } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

// Pages
import SignIn from "@/pages/auth/sign-in"
import Dashboard from "@/pages/dashboard"

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        {/* Mobile header */}
        <div className="lg:hidden p-4 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route 
          path="/dashboard" 
          element={
            <Layout>
              <Dashboard />
            </Layout>
          } 
        />
        <Route 
          path="/capacitaciones" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Capacitaciones</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/servicios-industriales" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Servicios Industriales</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/payment-report" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Reporte de Pagos</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/tables" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Tablas</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Perfil</h1>
                <p className="text-gray-600">Página en desarrollo</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
                <p className="text-gray-600">La página que buscas no existe</p>
              </div>
            </Layout>
          } 
        />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
