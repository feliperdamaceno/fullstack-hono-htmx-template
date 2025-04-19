import type { UserInsert } from '#models/user.model'
import type { RoleRepository } from '#repositories/role.repository'
import type { UserRepository } from '#repositories/user.repository'

import { BadRequestError } from '#exceptions/http'
import { UserInsertSchema } from '#models/user.model'

export class UserService {
  private readonly roleRepository: RoleRepository
  private readonly userRepository: UserRepository

  constructor(roleRepository: RoleRepository, userRepository: UserRepository) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
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
