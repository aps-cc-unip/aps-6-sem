import { Link } from 'react-router-dom'

export type AdminEntryStatisticsProps = {
  tasks: number
  users: number
  invoices: number
}

export default function AdminEntryStatistics({
  invoices,
  tasks,
  users,
}: AdminEntryStatisticsProps) {
  return (
    <div className="mb-8 grid grid-cols-3 gap-8">
      <Link
        to="/app/tasks"
        className="transform rounded bg-gradient-to-r from-orange-400 to-pink-600 p-4 text-white transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-200"
      >
        <p>Tarefas</p>
        <h2 className="text-2xl font-bold tracking-tighter">
          {tasks} no total
        </h2>
      </Link>
      <Link
        to="/app/users"
        className="transform rounded bg-gradient-to-r from-blue-400 to-indigo-600 p-4 text-white transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-200"
      >
        <p>Usuários</p>
        <h2 className="text-2xl font-bold tracking-tighter">{users} ativos</h2>
      </Link>
      <Link
        to="/app/invoices"
        className="transform rounded bg-gradient-to-r from-red-500 to-purple-600 p-4 text-white transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-200"
      >
        <p>Faturas</p>
        <h2 className="text-2xl font-bold tracking-tighter">
          {invoices} registros
        </h2>
      </Link>
    </div>
  )
}
