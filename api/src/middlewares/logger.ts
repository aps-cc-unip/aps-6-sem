import { logger } from '@/shared/logger'
import { Handler } from 'express'

export const loggerMiddleware: Handler = (req, res, next) => {
  const start = Date.now()
  const url = req.url
  const method = req.method
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  logger.info(`Request received\t${method} ${url} ${ip}`)

  req.on('close', () => {
    const end = Date.now()
    const duration = end - start
    if (res.statusCode >= 400) {
      logger.error(
        `Request failed\t${method} ${url} ${ip} ${res.statusCode} ${duration}ms`
      )
      return
    }

    logger.info(
      `Request succeeded\t${method} ${url} ${ip} ${res.statusCode} ${duration}ms`
    )
  })

  next()
}
