import { Role } from '@/domain/entities'
import { createBox } from '@/lib/blackbox'

export const authBox = createBox({
  name: 'Eder Lima',
  roles: [Role.ADMIN],
})
