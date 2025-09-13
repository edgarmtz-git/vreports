import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Users,
  Calendar,
  Download
} from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Facturado',
      value: '$1,234,567',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Facturas Pendientes',
      value: '23',
      change: '-3',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Crecimiento Mensual',
      value: '+8.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Clientes Activos',
      value: '156',
      change: '+5',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const recentInvoices = [
    { id: 'INV-001', client: 'Empresa ABC', amount: '$15,000', status: 'Pagado', date: '2024-01-15' },
    { id: 'INV-002', client: 'Corporación XYZ', amount: '$25,000', status: 'Pendiente', date: '2024-01-14' },
    { id: 'INV-003', client: 'Industrias DEF', amount: '$18,500', status: 'Vencido', date: '2024-01-10' },
    { id: 'INV-004', client: 'Servicios GHI', amount: '$12,000', status: 'Pagado', date: '2024-01-12' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen de tu negocio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Este mes
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">
                {stat.change} desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Facturas Recientes</CardTitle>
          <CardDescription>
            Últimas facturas generadas y su estado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <p className={`text-sm ${
                    invoice.status === 'Pagado' ? 'text-green-600' :
                    invoice.status === 'Pendiente' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {invoice.status}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {invoice.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
