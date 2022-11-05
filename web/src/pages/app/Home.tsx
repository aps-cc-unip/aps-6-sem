import DashboardLayout from '@/layout/DashboardLayout'
import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { Link } from 'react-router-dom'

export default function Home() {
  const auth = useBox(authBox)
  const { name } = auth.user!

  return (
    <DashboardLayout title="Home">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">
        Bem vindo, {name}.
      </h1>
      <p className="mb-8">Navegue pelos recursos abaixo</p>
      <div className="mb-8 w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 p-8 md:p-16 text-white shadow-lg shadow-blue-200">
        <h2 className="mb-4 text-4xl font-bold tracking-tighter">
          Atividades práticas supervisionadas
        </h2>
        <p>
          Autenticação biométrica com reconhecimento de imagem e níveis de
          permissão.
        </p>
      </div>
      <div className="mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/app/tasks" className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-bold">Tarefas</h2>
          <p>Visualize as tarefas em aberto</p>
        </Link>
        <Link to="/app/users" className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-bold">Usuários</h2>
          <p>Visualize os usuários da aplicação</p>
        </Link>
        <Link to="/app/invoices" className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-bold">Faturas</h2>
          <p>Visualize as faturas em aberto</p>
        </Link>
        <Link to="/app/admin" className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-bold">Admin</h2>
          <p>Visualização de administrador</p>
        </Link>
      </div>
    </DashboardLayout>
  )
}
