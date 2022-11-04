import { PrismaClient } from '@prisma/client'
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: Logger) {
    super()
  }

  async onModuleInit() {
    this.logger.log('Connecting to database', 'PrismaService')
    await this.$connect()
    this.logger.log('Connected to database', 'PrismaService')
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database', 'PrismaService')
    await this.$disconnect()
    this.logger.log('Disconnected from database', 'PrismaService')
  }
}
