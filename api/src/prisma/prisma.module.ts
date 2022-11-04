import { Logger, Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  providers: [PrismaService, Logger],
  exports: [PrismaService],
})
export class PrismaModule {}
