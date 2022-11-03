import { prismaClient } from '@/shared/prisma'

export const getInvoices = async () => {
  return await prismaClient.invoice.findMany()
}
