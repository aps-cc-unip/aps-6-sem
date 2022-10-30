import { useEffect } from 'react'
import { useBox } from '@/lib/blackbox'
import { adminBox, load } from '@/stores/admin'

import { authBox } from '@/stores/auth'

import AdminEntryStatistics from '@/components/AdminEntryStatistics'
import AdminTasksAndInvoicesStats from '@/components/AdminTasksAndInvoicesStats'
import DashboardLayout from '@/layout/DashboardLayout'

export default function Admin() {
  const { name } = useBox(authBox)
  const { invoices, tasks, users } = useBox(adminBox)

  useEffect(() => {
    load()
  }, [])

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
