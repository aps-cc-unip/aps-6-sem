import { Role, RolePriority } from './entities'

export const requiresLevel = (level: Role, role: Role) => {
  return RolePriority[role] >= RolePriority[level]
}
