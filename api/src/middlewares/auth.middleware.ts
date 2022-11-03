import type { NextFunction, Request, Response } from 'express'
import type { Auth, AuthLevel } from '@/domain/auth'
import { verify } from 'jsonwebtoken'

import { logger } from '@/shared/logger'
import { JWT_SECRET_KEY } from '@/config/constants'
import { prismaClient } from '@/shared/prisma'

const priority = {
  USER: 1,
  DIRECTOR: 2,
  MINISTER: 3,
}

export const requiresAuth = (level: AuthLevel) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const namespace = 'Auth'
    const auth = req.headers.authorization

    if (!auth) {
      logger.error('No authorization header', namespace)
      return res.status(401).json({ message: 'Missing authorization header' })
    }

    const [type, token] = auth.split(' ')

    if (type !== 'Bearer') {
      logger.error('Invalid authorization type', namespace)
      return res.status(401).json({ message: 'Token type is not bearer' })
    }

    if (!token) {
      logger.error('No token provided', namespace)
      return res.status(401).json({ message: 'Token is empty' })
    }

    try {
      const auth = verify(token, JWT_SECRET_KEY) as Auth

      if (priority[auth.role] < priority[level]) {
        logger.error('Insufficient permissions', namespace)
        return res
          .status(401)
          .json({ message: 'Authorization level is not sufficient' })
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: +auth.sub,
        },
      })

      if (!user) {
        logger.error('User not found', namespace)
        return res
          .status(401)
          .json({ message: 'User could not be found in the database' })
      }

      req.user = user
      next()
    } catch (err) {
      logger.error(`Error while verifying token: ${String(err)}`, 'Auth')
      return res
        .status(401)
        .json({ message: 'Error whilst trying to authenticate' })
    }
  }
}
