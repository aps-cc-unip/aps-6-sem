import { Router } from 'express'

import { healthRouter } from '@/modules/health/health.controller'
import { mockRouter } from '@/modules/mock/mock.controller'

export const router = Router()

router.use('/api/health', healthRouter)
router.use('/api/mock', mockRouter)
