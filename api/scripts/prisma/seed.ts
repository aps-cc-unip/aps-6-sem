import { PrismaClient, TaskPriority } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { resolve, join } from 'node:path'

const repeat = <T>(length: number, generator: () => T): T[] => {
  return Array.from({ length }, generator)
}

const rootPath = resolve(join(__dirname, '..', '..', '..', 'uploads'))

console.log(rootPath)

const seedUsers = async (client: PrismaClient) => {
  console.log('Inserting users')
  const users = [
    {
      name: 'Clayton Valdo',
      email: 'clayton@mail.com',
      password: join(rootPath, 'clayton.png'),
      role: 'MINISTER',
      tasks: [
        {
          title: 'Corrigir prova',
          description: 'Corrigir prova de Aspectos Teóricos da Computação',
          priority: TaskPriority.HIGH,
          completed: true,
        },
        {
          title: 'Preparar matéria de aula',
          description: 'Preparar aula de Processamento de Imagem',
          priority: TaskPriority.MEDIUM,
          completed: true,
        },
      ],
    },
    {
      name: 'Eder Oliveira Lima',
      email: 'eder@mail.com',
      password: join(rootPath, 'eder.jpeg'),
      role: 'MINISTER',
      tasks: [
        {
          title: '[APS] Desenvolver back-end',
          description: 'Desenvolver back-end da APS',
          priority: TaskPriority.HIGH,
          completed: true,
        },
      ],
    },
    {
      name: 'Gustavo Marinho',
      email: 'gustavo@mail.com',
      password: join(rootPath, 'gustavo.jpeg'),
      role: 'MINISTER',
      tasks: [
        {
          title: '[APS] Documentar módulo de reconhecimento de imagens',
          description: 'Documentar módulo de reconhecimento de imagens',
          priority: TaskPriority.HIGH,
        },
        {
          title: '[APS] Documentar o sistema de autenticação',
          description: 'Documentar o sistema de autenticação',
          priority: TaskPriority.HIGH,
          completed: true,
        },
      ],
    },
    {
      name: 'Matheus Farali',
      email: 'matheus@mail.com',
      password: join(rootPath, 'matheus.jpeg'),
      role: 'MINISTER',
      tasks: [
        {
          title: '[APS] Revisar módulo de reconhecimento de imagens',
          description: 'Revisar módulo de reconhecimento de imagens',
          priority: TaskPriority.LOW,
        },
        {
          title: '[APS] Revisar o sistema de autenticação',
          description: 'Revisar o sistema de autenticação',
          priority: TaskPriority.LOW,
          completed: true,
        },
      ],
    },
    {
      name: 'Marcus Vinícius',
      email: 'marcus@mail.com',
      password: join(rootPath, 'marcus.jpeg'),
      role: 'MINISTER',
      tasks: [
        {
          title: '[APS] Desenvolvimento da página de login',
          description: 'Desenvolvimento da página de login',
          priority: TaskPriority.HIGH,
        },
        {
          title: '[APS] Desenvolvimento da página de cadastro',
          description: 'Desenvolvimento da página de cadastro',
          priority: TaskPriority.HIGH,
          completed: true,
        },
      ],
    },
    {
      name: 'Jeferson dos Santos',
      email: 'jeferson@mail.com',
      password: join(rootPath, 'jeferson.jpeg'),
      role: 'MINISTER',
      tasks: [
        {
          title: '[APS] Documentação da arquitetura do projeto',
          description: 'Documentação da arquitetura do projeto',
          priority: TaskPriority.MEDIUM,
        },
      ],
    },
    {
      name: 'Lucas Cardoso',
      email: 'lucas@mail.com',
      password: join(rootPath, 'lucas.jpeg'),
      role: 'DIRECTOR',
      tasks: [
        {
          title: '[MARKETING] Reunião com o cliente',
          description: 'Reunião com o cliente para apresentar o projeto',
          priority: TaskPriority.HIGH,
          completed: true,
        },
      ],
    },
    {
      name: 'Paulo Domingues',
      email: 'paulo@mail.com',
      password: join(rootPath, 'paulo.jpeg'),
      role: 'DIRECTOR',
      tasks: [
        {
          title: '[MARKETING] Reunião com o cliente',
          description: 'Reunião com o cliente para apresentar o projeto',
          priority: TaskPriority.HIGH,
          completed: true,
        },
      ],
    },
    {
      name: 'Vitor Pacheco',
      email: 'vitor@mail.com',
      password: join(rootPath, 'vitor.jpeg'),
      role: 'USER',
      tasks: [
        {
          title: '[QA] Testar o projeto',
          description: 'Testar o projeto para encontrar bugs',
          priority: TaskPriority.HIGH,
        },
      ],
    },
    {
      name: 'Vanessa Molinari',
      email: 'vanessa@mail.com',
      password: join(rootPath, 'vanessa.jpeg'),
      role: 'USER',
      tasks: [
        {
          title: '[QA] Testar o projeto',
          description: 'Testar o projeto para encontrar bugs',
          priority: TaskPriority.HIGH,
        },
      ],
    },
  ]

  await client.task.deleteMany()
  await client.user.deleteMany()

  await Promise.all(
    users.map(async (user) => {
      await client.user.create({
        data: {
          ...user,
          tasks: {
            create: user.tasks,
          },
        },
      })
    })
  )
  console.log('Users inserted')
}

const seedInvoices = async (client: PrismaClient) => {
  console.log('Inserting invoices')

  const items = [
    'computadores',
    'notebooks',
    'cadeiras',
    'mesas',
    'teclados',
    'mouses',
    'monitores',
    'impressoras',
    'projetores',
    'caixas de som',
    'microfones',
    'câmeras de segurança',
    'headsets',
  ]

  const departments = [
    'TI',
    'Monitoramento',
    'DevOps',
    'Desenvolvimento',
    'Marketing',
    'QA',
    'Financeiro',
    'Recursos Humanos',
  ]

  const invoices = repeat(128, () => {
    const item = faker.helpers.arrayElement(items)
    const numberOfItems = faker.datatype.number({ min: 1, max: 20 })
    const department = faker.helpers.arrayElement(departments)

    return {
      title: `Compra de ${numberOfItems} ${item}`,
      description: `Compra de ${numberOfItems} ${item} para o departamento de ${department}`,
      amount: faker.datatype.number({ min: 100, max: 10000 }),
      department: department,
      paid: faker.datatype.boolean(),
    }
  })

  await client.invoice.deleteMany()
  await client.invoice.createMany({
    data: invoices,
  })

  console.log('Invoices inserted')
}

const seedIncidents = async (client: PrismaClient) => {
  console.log('Inserting incidents')

  const incidents = [
    {
      title: 'Uso de agrotóxicos proibidos',
      latitude: -23.160076193356563,
      longitude: -47.05739514345998,
    },
    {
      title: 'Fornecedor de agrotóxicos não licenciado',
      latitude: -23.008679231316524,
      longitude: -46.85826556072969,
    },
    {
      title: 'Contrabando de agrotóxicos nocivos',
      latitude: -23.152113147435475,
      longitude: -47.056259022500505,
    },
    {
      title: 'Contaminação de água via agrotóxicos',
      latitude: -23.301872061332467,
      longitude: -46.743842998774355,
    },
    {
      title: 'Transporte irregular de agrotóxicos',
      latitude: -23.12982645131587,
      longitude: -47.05416000220182,
    },
    {
      title: 'Descarte irregular de defensivos agrícolas',
      latitude: -23.16621506303785,
      longitude: -46.92013348452411,
    },
  ]

  await client.incident.deleteMany()
  await client.incident.createMany({
    data: incidents,
  })

  console.log('Incidents inserted')
}

const main = async () => {
  const client = new PrismaClient()

  await client.$connect()

  await Promise.all([
    seedUsers(client),
    seedInvoices(client),
    seedIncidents(client),
  ])

  await client.$disconnect()
}

main()
