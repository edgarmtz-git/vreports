export interface User {
  id: string
  username: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  number: string
  client: string
  amount: number
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  createdAt: string
  description?: string
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: 'cash' | 'transfer' | 'card'
  date: string
  reference?: string
}

export interface DashboardStats {
  totalInvoices: number
  totalAmount: number
  paidAmount: number
  pendingAmount: number
  overdueAmount: number
  monthlyGrowth: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  date: string
  amount: number
  invoices: number
}
