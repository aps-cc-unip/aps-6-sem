import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { Role } from '@/domain/entities'
import { getInvoices } from '@/services/api/invoices'

import DashboardLayout from '@/layout/DashboardLayout'

export default function Users() {
  const auth = useBox(authBox)
  const user = auth.user!

  const { data: invoices } = useQuery(['invoices'], getInvoices, {
    initialData: [],
  })

  if (user.role !== Role.DIRECTOR) {
    return <Navigate to="/home" />
  }

  return (
    <DashboardLayout title="Users">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Faturas</h1>
      <p className="mb-8">Confira a listagem de usuários</p>
      {invoices && (
        <table className="mb-4 w-full overflow-hidden rounded bg-white shadow-xl">
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Pago</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border-r px-4 py-2">{invoice.title}</td>
                <td className="border-r px-4 py-2">{invoice.description}</td>
                <td className="px-4 py-2">{invoice.department}</td>
                <td className="px-4 py-2">{invoice.paid ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  )
}
