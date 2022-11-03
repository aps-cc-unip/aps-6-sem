import { Router } from 'express'

import { mockRouter } from '@/modules/mock/mock.controller'
import { healthRouter } from '@/modules/health/health.controller'
import { usersRouter } from '@/modules/users/users.controller'
import { invoicesRouter } from '@/modules/invoices/invoices.controller'
import { tasksRouter } from '@/modules/tasks/tasks.controller'
import { incidentsRouter } from '@/modules/incidents/incidents.controller'

export const router = Router()

router.use('/api/health', healthRouter)
router.use('/api/mock', mockRouter)
router.use('/api/users', usersRouter)
router.use('/api/invoices', invoicesRouter)
router.use('/api/tasks', tasksRouter)
router.use('/api/incidents', incidentsRouter)
