import { Router } from 'express'

export const healthRouter = Router()

const startTime = Date.now()

healthRouter.get('/', (_req, res) => {
  const currentTime = Date.now()
  const uptime = currentTime - startTime
  res.json({ status: 'up', uptime: `${(uptime / 1000).toFixed(0)}s` })
})
