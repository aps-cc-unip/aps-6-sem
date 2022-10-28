import { Router } from 'express'

import { authRouter } from '@/modules/auth/auth.routes'
import { healthRouter } from '@/modules/health/health.routes'

export const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/health', healthRouter)
