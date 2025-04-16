import type { RoleSelect } from '#models/user.model'
import type { Database } from '#types/database.types'

import { eq } from 'drizzle-orm'

import { NotFoundError } from '#exceptions/http'
import { Role, RoleSelectSchema } from '#models/user.model'

export class RoleRepository {
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  async getByName(name: string): Promise<RoleSelect> {
    const [role] = await this.database
      .select()
      .from(Role)
      .where(eq(Role.name, name))

    const parsed = RoleSelectSchema.safeParse(role)

    if (!parsed.success || !parsed.data?.name) {
      throw new NotFoundError(`Role with name:"${name}" not found`)
    }

    return parsed.data
  }
}
