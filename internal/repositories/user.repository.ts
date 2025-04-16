import type { UserInsert, UserSelect } from '#models/user.model'
import type { Database } from '#types/database.types'

import { eq } from 'drizzle-orm'

import { InternalServerError, NotFoundError } from '#exceptions/http'
import { User, UserSelectSchema } from '#models/user.model'

export class UserRepository {
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  async create(user: UserInsert): Promise<UserSelect> {
    const [record] = await this.database.insert(User).values(user).returning()

    const parsed = UserSelectSchema.safeParse(record)
    if (!parsed.success || !parsed.data?.id) {
      throw new InternalServerError(
        'An unexpected error occurred while creating the user. Please try again later.'
      )
    }

    return parsed.data
  }

  async getById(id: number): Promise<UserSelect> {
    const [record] = await this.database
      .select()
      .from(User)
      .where(eq(User.id, id))

    const parsed = UserSelectSchema.safeParse(record)
    if (!parsed.success || !parsed.data?.id) {
      throw new NotFoundError(`User with id:"${id}" not found`)
    }

    return parsed.data
  }

  async getByName(name: string): Promise<UserSelect> {
    const [record] = await this.database
      .select()
      .from(User)
      .where(eq(User.name, name))

    const parsed = UserSelectSchema.safeParse(record)
    if (!parsed.success || !parsed.data?.id) {
      throw new NotFoundError(`User with name:"${name}" not found`)
    }

    return parsed.data
  }
}
