import type { UserInsert } from '#models/user.model'
import type { RoleRepository } from '#repositories/role.repository'
import type { UserRepository } from '#repositories/user.repository'

import { z } from 'zod/v4'

import { BadRequestError, NotFoundError } from '#exceptions/http'
import { env } from '#validators/env'
import {
  EmailSchema,
  NameSchema,
  PasswordSchema
} from '#validators/user.schema'

const BCRYPT_ALGORITHM_COST = env.BCRYPT_ALGORITHM_COST

export class UserService {
  private readonly roleRepository: RoleRepository
  private readonly userRepository: UserRepository

  constructor(roleRepository: RoleRepository, userRepository: UserRepository) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
  }

  async create(user: UserInsert) {
    const role = await this.roleRepository.getByName(user.role)
    if (!role) {
      const message = `The role with name "${user.role}" does not exist or is not available.`
      throw new NotFoundError(message)
    }

    const nameValidation = NameSchema.safeParse(user.name)
    if (!nameValidation.success) {
      const message = 'Please provide a valid user name.'
      throw new BadRequestError(message, {
        name: z.treeifyError(nameValidation.error).errors
      })
    }

    const emailValidation = EmailSchema.safeParse(user.email)
    if (!emailValidation.success) {
      const message = 'Please provide a valid email address.'
      throw new BadRequestError(message, {
        email: z.treeifyError(emailValidation.error).errors
      })
    }

    const passwordValidation = PasswordSchema.safeParse(user.password)
    if (!passwordValidation.success) {
      const message = 'Password does not meet the required strength criteria.'
      throw new BadRequestError(message, {
        password: z.treeifyError(passwordValidation.error).errors
      })
    }

    const existingUser = await this.userRepository.getByEmail(user.email)
    if (existingUser) {
      const message = `A user with the email "${user.email}" already exists.`
      throw new BadRequestError(message, { email: [message] })
    }

    const hashedPassword = await this.hashPassword(user.password)
    return this.userRepository.create({ ...user, password: hashedPassword })
  }

  private async hashPassword(password: string) {
    return await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: BCRYPT_ALGORITHM_COST
    })
  }
}
