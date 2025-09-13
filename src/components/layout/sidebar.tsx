import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  LayoutDashboard, 
  GraduationCap, 
  Settings, 
  FileText, 
  User, 
  Bell,
  CreditCard,
  BarChart3,
  X,
  ChevronRight,
  Home,
  Building2
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()

  const menuGroups = [
    {
      title: 'Principal',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      title: 'Servicios',
      items: [
        { path: '/capacitaciones', label: 'Capacitaciones', icon: GraduationCap },
        { path: '/servicios-industriales', label: 'Servicios Industriales', icon: Building2 },
      ]
    },
    {
      title: 'Reportes',
      items: [
        { path: '/payment-report', label: 'Reporte de Pagos', icon: CreditCard },
        { path: '/tables', label: 'Tablas', icon: BarChart3 },
      ]
    },
    {
      title: 'Configuración',
      items: [
        { path: '/notifications', label: 'Notificaciones', icon: Bell },
        { path: '/profile', label: 'Perfil', icon: User },
      ]
    }
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">VReportes</span>
            <span className="text-xs text-muted-foreground font-medium">Sistema Varcus</span>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-2">
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h3>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative",
                      "hover:bg-muted/50 hover:shadow-sm",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-5 h-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    )}
                    {!isActive && (
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-muted-foreground/60 transition-colors" />
                    )}
                  </Link>
                )
              })}
            </div>
            {groupIndex < menuGroups.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Sistema Activo</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Varcus © 2024
        </div>
      </div>
    </div>
  )
}
