import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now()
    const context = 'LoggerMiddleware'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const message = `${req.method} ${req.url} ${ip}`

    this.logger.log(message, context)

    req.on('end', () => {
      const end = Date.now()
      const time = end - now
      const message = `${req.method} ${req.url} ${ip} ${res.statusCode} took ${time}ms`

      if (res.statusCode >= 400) {
        return this.logger.error(message, context)
      }

      this.logger.log(message, context)
    })

    next()
  }
}
