import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  GraduationCap, 
  Settings, 
  FileText, 
  User, 
  Bell,
  CreditCard,
  BarChart3,
  X
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/capacitaciones', label: 'Capacitaciones', icon: GraduationCap },
    { path: '/servicios-industriales', label: 'Servicios Industriales', icon: Settings },
    { path: '/payment-report', label: 'Reporte de Pagos', icon: CreditCard },
    { path: '/tables', label: 'Tablas', icon: BarChart3 },
    { path: '/notifications', label: 'Notificaciones', icon: Bell },
    { path: '/profile', label: 'Perfil', icon: User },
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">VReportes</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={onClose}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Varcus © 2024
        </div>
      </div>
    </div>
  )
}
