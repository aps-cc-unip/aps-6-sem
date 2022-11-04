import { Controller, Get } from '@nestjs/common'

const start = Date.now()

@Controller('/api/health')
export class HealthController {
  @Get('/')
  health() {
    const now = Date.now()

    return {
      status: 'UP',
      uptime: ((now - start) / 1000).toFixed(0) + 's',
    }
  }
}
