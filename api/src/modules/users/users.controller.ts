import { Router } from 'express'
import { getUsers } from '@/modules/users/users.service'
import { requiresAuth } from '@/middlewares/auth.middleware'

export const usersRouter = Router()

usersRouter.get('/', requiresAuth('DIRECTOR'), async (req, res) => {
  const users = await getUsers()
  return res.status(200).json(users)
})

usersRouter.get('/profile', requiresAuth('USER'), async (req, res) => {
  return res.status(200).json(req.user)
})
