import express from 'express'
import { faker } from '@faker-js/faker'

const app = express()

const repeat = <T>(times: number, generator: () => T): T[] =>
  Array.from({ length: times }, generator)

const makeTask = () => ({
  id: faker.datatype.number(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  completed: faker.datatype.boolean(),
})

const makeUser = () => ({
  id: faker.datatype.number(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  tasks: repeat(8, makeTask),
})

const makeInvoice = () => ({
  id: faker.datatype.number(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  department: faker.commerce.department(),
  amount: faker.datatype.number({ min: 10, max: 999 }),
  date: faker.date.past(),
})

app.get('/api/tasks', (req, res) => {
  return res.status(200).json(repeat(32, makeTask))
})
app.get('/api/users', (req, res) => {
  return res.status(200).json(repeat(32, makeUser))
})
app.get('/api/invoices', (req, res) => {
  return res.status(200).json(repeat(32, makeInvoice))
})

app.listen(3333, () => {
  console.log('Server is running!')
})
