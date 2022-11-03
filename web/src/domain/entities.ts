export enum Role {
  USER = 'USER',
  DIRECTOR = 'DIRECTOR',
  MINISTER = 'MINISTER',
}

export const RolePriority = {
  [Role.USER]: 0,
  [Role.DIRECTOR]: 1,
  [Role.MINISTER]: 2,
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  priority: TaskPriority
  createdAt: string
  updatedAt: string
}

export type User = {
  id: number
  name: string
  email: string
  role: Role
  createdAt: string
  updatedAt: string
}

export type Invoice = {
  id: number
  title: string
  description: string
  department: string
  amount: number
  paid: boolean
  createdAt: string
  updatedAt: string
}

export type Incident = {
  id: number
  title: string
  latitude: number
  longitude: number
  createdAt: string
  updateAt: string
}
