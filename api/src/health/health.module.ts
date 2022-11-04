import { Module } from '@nestjs/common'
import { HealthController } from '@/health/health.controller'
import { PrismaModule } from '@/prisma/prisma.module'
import { JwtModule } from '@/jwt/jwt.module'

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [HealthController],
})
export class HealthModule {}
