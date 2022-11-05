import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { Role } from '@/domain/entities'
import { getInvoices } from '@/services/api/invoices'

import DashboardLayout from '@/layout/DashboardLayout'
import { requiresLevel } from '@/domain/auth'
import { formatCurrency } from '@/utils/currency'

export default function Users() {
  const auth = useBox(authBox)
  const user = auth.user!

  const { data: invoices } = useQuery(['invoices'], getInvoices, {
    initialData: [],
  })

  if (!requiresLevel(Role.DIRECTOR, user.role)) {
    return <Navigate to="/app/home" />
  }

  return (
    <DashboardLayout title="Users">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Faturas</h1>
      <p className="mb-8">Confira a listagem de usuários</p>
      <div className="overflow-x-auto rounded shadow-xl">
        <table className="w-full bg-white ">
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Pago</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border-r px-4 py-2">{invoice.title}</td>
                <td className="border-r px-4 py-2">{invoice.description}</td>
                <td className="border-r px-4 py-2">{invoice.department}</td>
                <td className="border-r px-4 py-2">
                  {invoice.paid ? 'Sim' : 'Não'}
                </td>
                <td className="px-4 py-2">{formatCurrency(invoice.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
