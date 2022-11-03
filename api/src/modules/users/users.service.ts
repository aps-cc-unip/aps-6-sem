import { prismaClient } from '@/shared/prisma'

export const getUsers = async () => {
  return await prismaClient.user.findMany()
}
