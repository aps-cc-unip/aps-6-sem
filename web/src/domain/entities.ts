export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}

export type User = {
  id: number
  name: string
  email: string
  tasks: Task[]
}

export type Invoice = {
  id: number
  title: string
  description: string
  department: string
  amount: number
  date: string
}
