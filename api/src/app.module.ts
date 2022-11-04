import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { HealthModule } from '@/health/health.module'
import { LoggerMiddleware } from '@/middlewares/logger.middleware'
import { UsersModule } from '@/users/users.module'
import { TasksModule } from '@/tasks/tasks.module'
import { InvoicesModule } from '@/invoices/invoices.module'
import { IncidentsModule } from '@/incidents/incidents.module'

@Module({
  imports: [
    HealthModule,
    IncidentsModule,
    UsersModule,
    TasksModule,
    InvoicesModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
