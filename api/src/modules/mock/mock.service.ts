import { faker } from '@/shared/faker'
import { repeat } from '@/utils/arrays'

const makeUser = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['MINISTER', 'DIRECTOR', 'USER']),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})

const makeTask = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(4),
  description: faker.lorem.paragraph(),
  completed: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.between('2023-01-01', '2023-10-30'),
  priority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
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

export class MockService {
  static fromDefaults() {
    return new MockService()
  }

  getUsers() {
    return repeat(32, makeUser)
  }

  getTasks() {
    return repeat(64, makeTask)
  }

  getInvoices() {
    return repeat(256, makeInvoices)
  }

  getProfile() {
    return makeUser()
  }
}
