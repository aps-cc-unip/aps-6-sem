export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DIRECTOR = 'DIRECTOR',
}

export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
  priority: 'low' | 'medium' | 'high'
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
  paid: boolean
  date: string
}
