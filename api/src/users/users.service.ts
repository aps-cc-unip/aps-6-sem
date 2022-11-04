import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany()
  }

  async getUser(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })
  }
}
