import jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JWT_SECRET } from '@/config/constants'

@Injectable()
export class JwtService {
  validate(token: string) {
    return jwt.verify(token, JWT_SECRET)
  }
}
