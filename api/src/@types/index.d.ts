declare namespace Express {
  enum Role {
    USER = 'USER',
    DIRECTOR = 'DIRECTOR',
    MINISTER = 'MINISTER',
  }

  export interface Request {
    user: {
      id: number
      name: string
      email: string
      role: Role
      createdAt: string
      updatedAt: string
    }
  }
}
