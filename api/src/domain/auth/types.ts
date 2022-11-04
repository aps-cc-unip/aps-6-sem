export type AuthPayload = {
  role: Role
  sub: string
}

export enum Role {
  DIRECTOR = 'DIRECTOR',
  USER = 'USER',
  MINISTER = 'MINISTER',
}

export const RolePrecedence = {
  [Role.USER]: 0,
  [Role.DIRECTOR]: 1,
  [Role.MINISTER]: 2,
}
