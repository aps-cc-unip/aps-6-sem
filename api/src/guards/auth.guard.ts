import { Request } from 'express'
import { Observable, subscribeOn } from 'rxjs'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
  HttpException,
  ForbiddenException,
  applyDecorators,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@/jwt/jwt.service'
import { PrismaService } from '@/prisma/prisma.service'
import { AuthPayload, Role } from '@/domain/auth/types'
import { Reflector } from '@nestjs/core'
import { hasPermission } from '@/domain/auth/cases'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<Role>('role', context.getHandler())
    const request = context.switchToHttp().getRequest<Request>()

    if (!request.headers.authorization) {
      throw new UnauthorizedException('Missing authorization header')
    }

    const [type, token] = request.headers.authorization.split(' ')

    if (type !== 'Bearer') {
      throw new UnauthorizedException('The provided token type is invalid')
    }

    try {
      const decoded = this.jwtService.validate(token) as AuthPayload

      const id = decoded.sub
      const userRole = decoded.role

      if (!hasPermission(userRole, role)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource'
        )
      }

      const user = await this.prismaService.user.findFirst({
        where: {
          id: +id,
        },
      })

      if (!user) {
        return false
      }

      request.user = {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        role: user!.role as any,
        createdAt: String(user!.createdAt),
        updatedAt: String(user!.updatedAt),
      }

      return true
    } catch (err) {
      return false
    }
  }
}

export function Permission(role: Role) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard))
}
