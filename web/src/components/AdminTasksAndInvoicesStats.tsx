import { Invoice, Task } from '@/domain/entities'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type AdminTasksAndInvoicesStatsProps = {
  tasks: Task[]
  invoices: Invoice[]
}

export default function AdminTasksAndInvoicesStats({
  tasks,
  invoices,
}: AdminTasksAndInvoicesStatsProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded bg-white p-8 shadow-xl shadow-gray-300">
        <h1 className="mb-2 text-3xl font-bold tracking-tighter">Tarefas</h1>
        <p className="mb-4">
          Porcentagem de tarefas concluídas:{' '}
          {((tasks.filter((t) => t.completed).length / tasks.length) * 100 || 0)
            .toFixed(2)
            .replace('.', ',')}
          %
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xl font-bold tracking-tighter">Concluídas</p>
            <h2 className="text-2xl font-bold tracking-tighter text-blue-600">
              {tasks.filter((t) => t.completed).length} tarefas
            </h2>
          </div>
          <div>
            <p className="text-xl font-bold tracking-tighter">Pendentes</p>
            <h2 className="text-2xl font-bold tracking-tighter text-rose-600">
              {tasks.filter((t) => !t.completed).length} tarefas
            </h2>
          </div>
          <AdminChart
            data={{
              labels: ['Tarefas'],
              datasets: [
                {
                  label: 'Concluídas',
                  data: [tasks.filter((t) => t.completed).length],
                  backgroundColor: 'rgb(37, 99, 235)',
                },
                {
                  label: 'Pendentes',
                  data: [tasks.filter((t) => !t.completed).length],
                  backgroundColor: 'rgb(225, 29, 72)',
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="rounded bg-white p-8 shadow-xl shadow-gray-300">
        <h1 className="mb-2 text-3xl font-bold tracking-tighter">Faturas</h1>
        <p className="mb-4">
          Porcentagem de faturas pendentes:{' '}
          {(
            (invoices.filter((t) => t.paid).length / invoices.length) * 100 || 0
          )
            .toFixed(2)
            .replace('.', ',')}
          %
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xl font-bold tracking-tighter">Pagas</p>
            <h2 className="text-2xl font-bold tracking-tighter text-blue-600">
              {invoices.filter((t) => t.paid).length} pagas
            </h2>
          </div>
          <div>
            <p className="text-xl font-bold tracking-tighter">Pendentes</p>
            <h2 className="text-2xl font-bold tracking-tighter text-rose-600">
              {invoices.filter((t) => !t.paid).length} pendentes
            </h2>
          </div>
          <AdminChart
            data={{
              labels: ['Faturas'],
              datasets: [
                {
                  label: 'Pagas',
                  data: [invoices.filter((t) => t.paid).length],
                  backgroundColor: 'rgb(37, 99, 235)',
                },
                {
                  label: 'Pendentes',
                  data: [invoices.filter((t) => !t.paid).length],
                  backgroundColor: 'rgb(225, 29, 72)',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}

type AdminChartProps = {
  data: ChartData<'bar', number[], string>
}

const AdminChart: React.FC<AdminChartProps> = ({ data }) => {
  return (
    <Bar
      options={{
        scales: {
          x: {
            grid: {
              lineWidth: 0,
            },
          },
          y: {
            grid: {
              lineWidth: 0,
            },
          },
        },
      }}
      className="mt-4"
      data={data}
    />
  )
}
