import { Router } from 'express'

import { authRouter } from '@/modules/auth/auth.routes'
import { healthRouter } from '@/modules/health/health.routes'
import { mockRouter } from '@/modules/mock/mock.routes'

export const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/health', healthRouter)
router.use('/api/mock', mockRouter)
