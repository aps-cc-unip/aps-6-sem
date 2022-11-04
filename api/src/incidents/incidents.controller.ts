import { Controller, Get } from '@nestjs/common'
import { IncidentsService } from '@/incidents/incidents.service'
import { Permission } from '@/guards/auth.guard'
import { Role } from '@/domain/auth/types'

@Controller('/api/incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get('/')
  @Permission(Role.MINISTER)
  async getIncidents() {
    return await this.incidentsService.getIncidents()
  }
}
