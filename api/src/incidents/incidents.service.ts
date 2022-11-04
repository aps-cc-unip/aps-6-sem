import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class IncidentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getIncidents() {
    return await this.prismaService.incident.findMany()
  }
}
