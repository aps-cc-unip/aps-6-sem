declare namespace Express {
  type User = {
    id: number
    email: string
    name: string
    role: string

    createdAt: Date
    updatedAt: Date
  }

  interface Request {
    user: User
  }
}
