import type { UserInsert } from '#models/user.model'
import type { RoleRepository } from '#repositories/role.repository'
import type { UserRepository } from '#repositories/user.repository'

import { BadRequestError } from '#exceptions/http'
import { UserInsertSchema } from '#models/user.model'

export class UserService {
  private readonly userRepository: UserRepository
  private readonly roleRepository: RoleRepository

  constructor(userRepository: UserRepository, roleRepository: RoleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }

  async create(user: UserInsert) {
    const role = await this.roleRepository.getByName(user.role)

    const parsed = UserInsertSchema.safeParse(user)
    if (!parsed.success || !role) {
      throw new BadRequestError(
        'Required fields are missing. Please provide all necessary information.'
      )
    }

    return this.userRepository.create(user)
  }
}
