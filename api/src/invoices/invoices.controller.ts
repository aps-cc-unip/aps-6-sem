import { Controller, Get } from '@nestjs/common'
import { Role } from '@/domain/auth/types'
import { Permission } from '@/guards/auth.guard'
import { InvoicesService } from '@/invoices/invoices.service'

@Controller('/api/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('/')
  @Permission(Role.DIRECTOR)
  async getInvoices() {
    return await this.invoicesService.getInvoices()
  }
}
