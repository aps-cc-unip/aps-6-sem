import { Router } from 'express'
import { MockService } from '@/modules/mock/mock.service'

export const mockRouter = Router()
const mockService = MockService.fromDefaults()

mockRouter.get('/users', (_req, res) => {
  const users = mockService.getUsers()
  res.setHeader('cache-control', 'private,max-age=120').json(users)
})

mockRouter.get('/tasks', (_req, res) => {
  const tasks = mockService.getTasks()
  res.setHeader('cache-control', 'private,max-age=120').json(tasks)
})

mockRouter.get('/invoices', (_req, res) => {
  const invoices = mockService.getInvoices()
  res.setHeader('cache-control', 'private,max-age=120').json(invoices)
})

mockRouter.get('/profile', (_req, res) => {
  const user = mockService.getProfile()
  res.json(user)
})
