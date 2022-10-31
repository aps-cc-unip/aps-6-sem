import { Router } from 'express'
import { faker } from '@faker-js/faker'

export const mockRouter = Router()

const repeat = <T>(n: number, fn: () => T): T[] => Array.from({ length: n }, fn)

faker.setLocale('pt_BR')

const makeUser = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  department: faker.commerce.department(),
  role: faker.helpers.arrayElement(['DIRECTOR', 'ADMIN', 'USER']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})

/*
public class User {
  @Id()
  @GeneratedValue(strategy=AUTO)
  private String id;

  @Column(nullable = false)
  private String name;

  @Unique()
  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String department;

  @Column(nullable = false)
  private String role;

  @Column(nullable = false)
  @CreationTimestamp()
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @Column(nullable = false)
  @UpdateTimestamp()
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedAt;
}

*/

const makeTask = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(4),
  description: faker.lorem.paragraph(),
  completed: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.between('2023-01-01', '2023-10-30'),
  priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
})

const makeInvoices = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(4),
  description: faker.lorem.sentence(8),
  amount: faker.datatype.number({ min: 10, max: 1000 }),
  paid: faker.datatype.boolean(),
  department: faker.commerce.department(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.between('2023-01-01', '2023-10-30'),
})

mockRouter.get('/users', (req, res) => {
  const users = repeat(32, makeUser)

  res.setHeader('cache-control', 'private,max-age=120').json(users)
})

mockRouter.get('/tasks', (req, res) => {
  const tasks = repeat(64, makeTask)

  res.setHeader('cache-control', 'private,max-age=120').json(tasks)
})

mockRouter.get('/invoices', (req, res) => {
  const invoices = repeat(256, makeInvoices)

  res.setHeader('cache-control', 'private,max-age=120').json(invoices)
})
