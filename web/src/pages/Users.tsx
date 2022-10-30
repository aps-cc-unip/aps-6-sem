import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Role } from '@/domain/entities'
import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { getUsers } from '@/services/api/users'

import DashboardLayout from '@/layout/DashboardLayout'

export default function Users() {
  const auth = useBox(authBox)

  const user = auth.user!

  const { data: users } = useQuery(['users'], getUsers, {
    initialData: [],
  })

  if (![Role.ADMIN, Role.DIRECTOR].includes(user.role)) {
    return <Navigate to="/home" />
  }

  return (
    <DashboardLayout title="Users">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Usuários </h1>
      <p className="mb-8">Confira a listagem de usuários</p>
      {users && (
        <table className="mb-4 w-full overflow-hidden rounded bg-white shadow-xl">
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Cargo</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-r px-4 py-2">{user.name}</td>
                <td className="border-r px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.department}</td>
                <td className="px-4 py-2">
                  {user.role === Role.ADMIN
                    ? 'Administrador'
                    : user.role === Role.DIRECTOR
                    ? 'Diretor'
                    : 'Usuário'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  )
}
