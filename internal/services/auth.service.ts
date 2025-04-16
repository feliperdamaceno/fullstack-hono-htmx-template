import type { UserInsert } from '#models/user.model'
import type { UserService } from '#services/user.service'
import type { AuthToken } from '#types/auth.types'
import type { Context } from 'hono'
import type { StringValue } from 'ms'

import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import ms from 'ms'

import { env } from '#validators/env'

export class AuthService {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async register(user: UserInsert) {
    const hashedPassword = await this.hashPassword(user.password)

    return await this.userService.create({
      ...user,
      password: hashedPassword
    })
  }

  async login() {}

  async logout() {}

  private async hashPassword(password: string) {
    return await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 12
    })
  }

  private async encodeJwt(token: AuthToken) {
    return await sign(token, env.JWT_SECRET)
  }

  private async setJwtCookie(
    ctx: Context,
    token: string,
    maxAge: StringValue = '30d'
  ) {
    setCookie(ctx, 'token', token, {
      path: '/',
      maxAge: ms(maxAge),
      httpOnly: env.NODE_ENV! === 'production',
      sameSite: 'Strict',
      secure: env.NODE_ENV! === 'production'
    })
  }
}
