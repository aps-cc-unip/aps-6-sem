import { Invoice, Task, User } from '@/domain/entities'
import { createBox } from '@/lib/blackbox'
import { getInvoices } from '@/services/api/invoices'
import { getTasks } from '@/services/api/tasks'
import { getUsers } from '@/services/api/users'

export const adminBox = createBox({
  tasks: [] as Task[],
  users: [] as User[],
  invoices: [] as Invoice[],
})

const loadTasks = async () => {
  const tasks = await getTasks()

  adminBox.set({ tasks })
}

const loadUsers = async () => {
  const users = await getUsers()

  adminBox.set({ users })
}

const loadInvoices = async () => {
  const invoices = await getInvoices()

  adminBox.set({ invoices })
}

export const load = async () => {
  await Promise.all([loadTasks(), loadUsers(), loadInvoices()])
}
