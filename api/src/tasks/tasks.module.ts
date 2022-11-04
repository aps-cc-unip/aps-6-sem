import { Module } from '@nestjs/common'
import { JwtModule } from '@/jwt/jwt.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { TasksService } from '@/tasks/tasks.service'
import { TasksController } from '@/tasks/tasks.controller'

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
