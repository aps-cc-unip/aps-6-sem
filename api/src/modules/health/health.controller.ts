import { Router } from 'express'

export const healthRouter = Router()

const startTime = Date.now()

healthRouter.get('/', (req, res) => {
  const uptime = Date.now() - startTime

  res.json({ status: 'up', uptime: `${(uptime / 1000).toFixed(0)}s` })
})
