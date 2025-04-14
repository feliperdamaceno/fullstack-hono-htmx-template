import type { Database } from '#types/database.types'

import { eq } from 'drizzle-orm'

import { User } from '#models/user.model'

export class UserRepository {
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  async getByName(name: string) {
    const user = await this.database
      .select({
        name: User.name
      })
      .from(User)
      .where(eq(User.name, name))

    return user[0]
  }
}
