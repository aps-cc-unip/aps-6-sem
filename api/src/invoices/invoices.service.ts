import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InvoicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getInvoices() {
    return this.prismaService.invoice.findMany()
  }
}
