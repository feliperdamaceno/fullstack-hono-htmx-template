import type { UserRepository } from '#repositories/user.repository'
import type { AuthToken } from '#types/auth.types'
import type { StringValue } from 'ms'

import { sign } from 'hono/jwt'
import ms from 'ms'

import { BadRequestError } from '#exceptions/http'
import { env } from '#validators/env'
import { EmailSchema, PasswordSchema } from '#validators/user.schema'

const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN as StringValue

export class AuthService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async login(email: string, password: string) {
    const emailValidation = EmailSchema.safeParse(email)
    if (!emailValidation.success) {
      throw new BadRequestError('Please provide a valid email address.')
    }

    const passwordValidation = PasswordSchema.safeParse(password)
    if (!passwordValidation.success) {
      const errors =
        passwordValidation.error.errors.map((e) => e.message).join(' ') ||
        'Password does not meet the required strength criteria.'
      throw new BadRequestError(errors)
    }

    const user = await this.userRepository.getByEmail(email)
    if (!user) {
      throw new BadRequestError(
        `User with the email "${email}" has not been found.`
      )
    }

    const isValidPassword = await this.verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw new BadRequestError('Incorrect password. Please try again.')
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

  private async verifyPassword(passsword: string, hash: string) {
    return await Bun.password.verify(passsword, hash)
  }

  private async encodeJwt(token: AuthToken) {
    return await sign(token, env.JWT_SECRET)
  }
}
