import { Controller, Get } from '@nestjs/common'
import { Role } from '@/domain/auth/types'
import { Permission } from '@/guards/auth.guard'
import { TasksService } from '@/tasks/tasks.service'

@Controller('/api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  @Permission(Role.USER)
  async getTasks() {
    return await this.tasksService.getTasks()
  }
}
