import { prismaClient } from '@/shared/prisma'

export const getIncidents = async () => {
  const incidents = await prismaClient.incident.findMany()
  return incidents
}
