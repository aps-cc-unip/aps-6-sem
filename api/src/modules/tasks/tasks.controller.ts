import { Router } from 'express'
import { getTasks } from '@/modules/tasks/tasks.service'
import { requiresAuth } from '@/middlewares/auth.middleware'

export const tasksRouter = Router()

tasksRouter.get('/', requiresAuth('USER'), async (req, res) => {
  const tasks = await getTasks()
  return res.status(200).json(tasks)
})
