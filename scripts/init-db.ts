import { Role, User } from 'internal/models/user.model.ts'

import { database } from '#database/driver'

const ADMIN_ROLE_PK = 'admin' as const
const USER_ROLE_PK = 'user' as const

async function init() {
  try {
    await database.transaction(async (transaction) => {
      await transaction.insert(Role).values({ name: ADMIN_ROLE_PK })
      await transaction.insert(Role).values({ name: USER_ROLE_PK })

      const user = await transaction
        .insert(User)
        .values({
          name: ADMIN_ROLE_PK,
          email: `${ADMIN_ROLE_PK}@example.com`,
          password: ADMIN_ROLE_PK,
          role: ADMIN_ROLE_PK
        })
        .returning({
          id: User.id
        })

      if (!user[0]?.id) return console.error('Failed to insert user')
      console.log('Database successfully initialized!')
    })
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

init()
