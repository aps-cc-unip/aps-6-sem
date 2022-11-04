import { Module } from '@nestjs/common'
import { JwtModule } from '@/jwt/jwt.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { IncidentsService } from '@/incidents/incidents.service'
import { IncidentsController } from '@/incidents/incidents.controller'

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [IncidentsService],
  controllers: [IncidentsController],
})
export class IncidentsModule {}
