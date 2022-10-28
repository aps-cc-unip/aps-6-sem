import { Router } from 'express'
import { registerSchema } from '@/modules/auth/auth.validators'
import { validateRequestMiddleware } from '@/middlewares/validator'
import { imageUpload } from '@/shared/upload'

export const authRouter = Router()

authRouter.post(
  '/register',
  imageUpload.single('password'),
  validateRequestMiddleware('body', registerSchema),
  (req, res) => {
    res.json({
      message: 'Hello World!',
    })
  }
)
