import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { getInvoices } from '@/services/api/invoices'
import { getTasks } from '@/services/api/tasks'
import { getUsers } from '@/services/api/users'
import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { Role } from '@/domain/entities'

import AdminEntryStatistics from '@/components/AdminEntryStatistics'
import AdminTasksAndInvoicesStats from '@/components/AdminTasksAndInvoicesStats'
import DashboardLayout from '@/layout/DashboardLayout'

export default function Admin() {
  const auth = useBox(authBox)
  const user = auth.user!

  const {
    data: { invoices, tasks, users },
  } = useQuery(
    ['admin'],
    async () => ({
      invoices: await getInvoices(),
      tasks: await getTasks(),
      users: await getUsers(),
    }),
    {
      initialData: {
        invoices: [],
        tasks: [],
        users: [],
      },
    },
  )

  if (user.role !== Role.MINISTER) {
    return <Navigate to="/app/home" />
  }

  return (
    <DashboardLayout title="Admin">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter text-gray-900">
        Administração
      </h1>
      <p className="mb-8">Confira as informações de gerenciamento abaixo.</p>
      <AdminEntryStatistics
        tasks={tasks.length}
        invoices={invoices.length}
        users={users.length}
      />
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">
        Informações gerais
      </h1>
      <p className="mb-8">Acompanhe as informações da empresa.</p>
      <AdminTasksAndInvoicesStats tasks={tasks} invoices={invoices} />
    </DashboardLayout>
  )
}
