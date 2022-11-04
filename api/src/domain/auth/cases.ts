import { Role, RolePrecedence } from '@/domain/auth/types'

export const hasPermission = (userRole: Role, requirement: Role) => {
  return RolePrecedence[userRole] >= RolePrecedence[requirement]
}
