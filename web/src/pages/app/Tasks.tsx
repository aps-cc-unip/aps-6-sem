import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@/utils/date'
import { getTasks } from '@/services/api/tasks'

import DashboardLayout from '@/layout/DashboardLayout'

export default function Tasks() {
  const { data: tasks } = useQuery(['tasks'], getTasks, {
    initialData: [],
  })

  return (
    <DashboardLayout title="Tarefas">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Tarefas</h1>
      <p className="mb-8">Confira a listagem de tarefas abaixo</p>
      <div className="overflow-x-auto rounded shadow-xl">
        <table className="w-full  bg-white">
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
            {tasks
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
                        task.priority === 'HIGH'
                          ? 'bg-red-600'
                          : task.priority === 'MEDIUM'
                          ? 'bg-yellow-500'
                          : 'bg-blue-600'
                      }`}
                    >
                      {task.priority === 'HIGH'
                        ? 'Alta'
                        : task.priority === 'MEDIUM'
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
      </div>
    </DashboardLayout>
  )
}
