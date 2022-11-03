export type AuthLevel = 'USER' | 'DIRECTOR' | 'MINISTER'

export type Auth = {
  sub: string
  role: AuthLevel
  exp: number
}
