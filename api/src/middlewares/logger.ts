import { Handler } from 'express'
import chalk from 'chalk'
import { logger } from '@/shared/logger'

export const loggerMiddleware: Handler = (req, res, next) => {
  const start = Date.now()
  const url = req.url
  const method = req.method
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  logger.info(`${method} ${url} ${ip}`)

  req.on('close', () => {
    const end = Date.now()
    const duration = chalk.yellow(`(${end - start}ms)`)
    if (res.statusCode >= 400) {
      logger.error(`${method} ${url} ${ip} ${res.statusCode} ${duration}`)
      return
    }

    logger.info(`${method} ${url} ${ip} ${res.statusCode} ${duration}`)
  })

  next()
}
