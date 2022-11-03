import { prismaClient } from '@/shared/prisma'

export const getTasks = async () => {
  return await prismaClient.task.findMany()
}
