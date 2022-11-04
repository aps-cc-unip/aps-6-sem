import { Request } from 'express'
import { Controller, Get, Req } from '@nestjs/common'
import { Role } from '@/domain/auth/types'
import { Permission } from '@/guards/auth.guard'
import { UsersService } from '@/users/users.service'

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Permission(Role.DIRECTOR)
  async getUsers() {
    return await this.usersService.getUsers()
  }

  @Get('/profile')
  @Permission(Role.USER)
  getProfile(@Req() request: Request) {
    return request.user!
  }
}
