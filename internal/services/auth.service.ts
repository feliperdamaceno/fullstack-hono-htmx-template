import type { TimeValue } from '#helpers/time.helper'
import type { UserRepository } from '#repositories/user.repository'
import type { AuthToken } from '#types/auth.types'

import { sign } from 'hono/jwt'
import { z } from 'zod/v4'

import { ms } from '#helpers/time.helper'

import { BadRequestError } from '#exceptions/http'
import { env } from '#validators/env'
import { EmailSchema, PasswordSchema } from '#validators/user.schema'

const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN as TimeValue

export class AuthService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async login(email: string, password: string) {
    const emailValidation = EmailSchema.safeParse(email)
    if (!emailValidation.success) {
      const message = 'Please provide a valid email address.'
      throw new BadRequestError(message, {
        email: z.treeifyError(emailValidation.error).errors
      })
    }

    const passwordValidation = PasswordSchema.safeParse(password)
    if (!passwordValidation.success) {
      const message = 'Password does not meet the required strength criteria.'
      throw new BadRequestError(message, {
        password: z.treeifyError(passwordValidation.error).errors
      })
    }

    const user = await this.userRepository.getByEmail(email)
    if (!user) {
      const message = `User with the email "${email}" has not been found.`
      throw new BadRequestError(message, { email: [message] })
    }

    const isValidPassword = await this.verifyPassword(password, user.password)
    if (!isValidPassword) {
      const message = 'Incorrect password. Please try again.'
      throw new BadRequestError(message, { password: [message] })
    }

    const token = await this.encodeJwt({
      id: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000) /* seconds */,
      exp: Math.floor((Date.now() + ms(JWT_EXPIRES_IN)) / 1000) /* seconds */
    })

    return token
  }

  private async verifyPassword(password: string, hash: string) {
    return await Bun.password.verify(password, hash)
  }

  private async encodeJwt(token: AuthToken) {
    return await sign(token, env.JWT_SECRET)
  }
}
