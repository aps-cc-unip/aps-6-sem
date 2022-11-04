import { Module } from '@nestjs/common'
import { JwtModule } from '@/jwt/jwt.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { UsersController } from '@/users/users.controller'
import { UsersService } from '@/users/users.service'

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
