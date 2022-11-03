import { Router } from 'express'
import { MockService } from '@/modules/mock/mock.service'
import { requiresAuth } from '@/middlewares/auth.middleware'

export const mockRouter = Router()
const mockService = MockService.fromDefaults()

mockRouter.get('/users', requiresAuth('ADMIN'), (_req, res) => {
  const users = mockService.getUsers()
  res.setHeader('cache-control', 'private,max-age=120').json(users)
})

mockRouter.get('/tasks', requiresAuth('USER'), (_req, res) => {
  const tasks = mockService.getTasks()
  res.setHeader('cache-control', 'private,max-age=120').json(tasks)
})

mockRouter.get('/invoices', requiresAuth('DIRECTOR'), (_req, res) => {
  const invoices = mockService.getInvoices()
  res.setHeader('cache-control', 'private,max-age=120').json(invoices)
})

mockRouter.get('/profile', requiresAuth('USER'), (req, res) => {
  res.json(req.user)
})
