import type { UserInsert } from '#models/user.model'
import type { RoleRepository } from '#repositories/role.repository'
import type { UserRepository } from '#repositories/user.repository'

import { BadRequestError, NotFoundError } from '#exceptions/http'
import { UserInsertSchema } from '#models/user.model'
import { PasswordSchema } from '#validators/password'

const BCRYPT_ALGORITHM_COST = 12 as const

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
      throw new NotFoundError(
        `The role with name "${user.role}" does not exist or is not available.`
      )
    }

    const userValidation = UserInsertSchema.safeParse(user)
    if (!userValidation.success || !role) {
      throw new BadRequestError(
        'Missing required fields or invalid role. Please ensure all necessary information is provided.'
      )
    }

    const passwordValidation = PasswordSchema.safeParse(user.password)
    if (!passwordValidation.success) {
      const errors =
        passwordValidation.error.errors.map((e) => e.message).join(' ') ||
        'Password does not meet the required strength criteria. Please ensure the password is strong enough.'
      throw new BadRequestError(errors)
    }

    const existingUser = await this.userRepository.getByEmail(user.email)
    if (existingUser) {
      throw new BadRequestError(
        `A user with the email "${user.email}" already exists.`
      )
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
