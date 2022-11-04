import { Module } from '@nestjs/common'
import { InvoicesService } from '@/invoices/invoices.service'
import { InvoicesController } from '@/invoices/invoices.controller'
import { PrismaModule } from '@/prisma/prisma.module'
import { JwtModule } from '@/jwt/jwt.module'

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
