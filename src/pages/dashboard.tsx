import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Users,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye
} from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Facturado',
      value: '$1,234,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'Ingresos totales del mes'
    },
    {
      title: 'Facturas Pendientes',
      value: '23',
      change: '-3',
      changeType: 'negative',
      icon: FileText,
      description: 'Facturas por cobrar'
    },
    {
      title: 'Crecimiento Mensual',
      value: '+8.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'Comparado con el mes anterior'
    },
    {
      title: 'Clientes Activos',
      value: '156',
      change: '+5',
      changeType: 'positive',
      icon: Users,
      description: 'Clientes con actividad reciente'
    }
  ]

  const recentInvoices = [
    { 
      id: 'INV-001', 
      client: 'Empresa ABC', 
      amount: '$15,000', 
      status: 'Pagado', 
      statusType: 'success',
      date: '2024-01-15',
      dueDate: '2024-01-20'
    },
    { 
      id: 'INV-002', 
      client: 'Corporación XYZ', 
      amount: '$25,000', 
      status: 'Pendiente', 
      statusType: 'warning',
      date: '2024-01-14',
      dueDate: '2024-01-19'
    },
    { 
      id: 'INV-003', 
      client: 'Industrias DEF', 
      amount: '$18,500', 
      status: 'Vencido', 
      statusType: 'destructive',
      date: '2024-01-10',
      dueDate: '2024-01-15'
    },
    { 
      id: 'INV-004', 
      client: 'Servicios GHI', 
      amount: '$12,000', 
      status: 'Pagado', 
      statusType: 'success',
      date: '2024-01-12',
      dueDate: '2024-01-17'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen completo de tu negocio y métricas clave
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Este mes
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-md bg-muted p-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span>desde el mes pasado</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Facturas Recientes</CardTitle>
              <CardDescription>
                Últimas facturas generadas y su estado
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md bg-muted p-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{invoice.amount}</p>
                      <p className="text-xs text-muted-foreground">Vence: {invoice.dueDate}</p>
                    </div>
                    <Badge variant={invoice.statusType as any}>
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Herramientas y funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline" className="justify-start h-12">
                <FileText className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Nueva Factura</div>
                  <div className="text-xs text-muted-foreground">Crear factura desde cero</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <Users className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Gestionar Clientes</div>
                  <div className="text-xs text-muted-foreground">Ver y editar clientes</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <TrendingUp className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Ver Reportes</div>
                  <div className="text-xs text-muted-foreground">Análisis y estadísticas</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
