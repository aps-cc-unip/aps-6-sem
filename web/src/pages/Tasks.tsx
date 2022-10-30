import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@/utils/date'
import { getTasks } from '@/services/api/tasks'

import DashboardLayout from '@/layout/DashboardLayout'

export default function Tasks() {
  const { data, isLoading, isError } = useQuery(['tasks'], getTasks)

  return (
    <DashboardLayout title="Tarefas">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Tarefas</h1>
      <p className="mb-8">Confira a listagem de tarefas abaixo</p>
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar tarefas</p>}
      {data && (
        <table className="w-full overflow-hidden rounded bg-white shadow-xl">
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-blue-600 text-left font-normal text-white">
              <th className="px-4 py-2">Finalizada</th>
              <th className="px-4 py-2">Tarefa</th>
              <th className="px-4 py-2">Prioridade</th>
              <th className="px-4 py-2">Criada em</th>
              <th className="px-4 py-2">Atualizada em</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data
              .sort((a, b) => +(new Date(a.createdAt) > new Date(b.createdAt)))
              .sort((a) => (a.completed ? 1 : -1))
              .map((task) => (
                <tr key={task.id}>
                  <td className="flex items-center gap-2 border-r px-4 py-2">
                    <span
                      className={`block h-4 w-4 rounded border-2 ${
                        task.completed
                          ? 'border-purple-600 shadow-sm shadow-purple-200'
                          : 'border-blue-600'
                      }`}
                    ></span>
                    {task.completed ? 'Sim' : 'Não'}
                  </td>
                  <td className="border-r px-4 py-2">{task.title}</td>
                  <td className="border-r px-4 py-2">
                    <span
                      className={`rounded-full py-[0.125rem] px-2 text-xs text-white ${
                        task.priority === 'high'
                          ? 'bg-rose-600'
                          : task.priority === 'medium'
                          ? 'bg-purple-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {task.priority === 'high'
                        ? 'Alta'
                        : task.priority === 'medium'
                        ? 'Média'
                        : 'Baixa'}
                    </span>
                  </td>
                  <td className="border-r px-4 py-2">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-4 py-2">{formatDate(task.updatedAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  )
}
