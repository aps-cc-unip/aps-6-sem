import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const context = 'LoggerMiddleware'
    const message = `${req.method} ${req.url} ${req.socket.remoteAddress}`

    this.logger.log(message, context)

    req.on('end', () => {
      const message = `${req.method} ${req.url} ${req.socket.remoteAddress} ${res.statusCode}`

      if (res.statusCode >= 400) {
        return this.logger.error(message, context)
      }

      this.logger.log(message, context)
    })

    next()
  }
}
