import { Router } from 'express'
import { faker } from '@faker-js/faker'

export const mockRouter = Router()

const repeat = <T>(n: number, fn: () => T): T[] => Array.from({ length: n }, fn)

const makeUser = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})

const makeTask = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  completed: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.between('2023-01-01', '2023-10-30'),
  priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
})

const makeInvoices = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  amount: faker.datatype.number({ min: 10, max: 1000 }),
  paid: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.between('2023-01-01', '2023-10-30'),
})

mockRouter.get('/users', (req, res) => {
  const users = repeat(32, makeUser)

  res.setHeader('Cache-Control', 'public,max-age=120').json(users)
})

mockRouter.get('/tasks', (req, res) => {
  const tasks = repeat(64, makeTask)

  res.setHeader('Cache-Control', 'public,max-age=120').json(tasks)
})

mockRouter.get('/invoices', (req, res) => {
  const invoices = repeat(256, makeInvoices)

  res.setHeader('Cache-Control', 'public,max-age=120').json(invoices)
})
