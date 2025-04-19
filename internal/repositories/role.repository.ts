import type { RoleSelect } from '#models/user.model'
import type { Database } from '#types/database.types'

import { eq } from 'drizzle-orm'

import { Role } from '#models/user.model'

export class RoleRepository {
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  async getByName(name: string): Promise<RoleSelect | undefined> {
    const [role] = await this.database
      .select()
      .from(Role)
      .where(eq(Role.name, name))

    return role
  }
}
