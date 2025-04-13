import { Role, User } from 'internal/models/user.model.ts'

import { database } from '#database/driver'

const ROLE_ADMIN = 'admin' as const

async function init() {
  try {
    await database.transaction(async (transaction) => {
      await transaction.insert(Role).values({
        name: ROLE_ADMIN
      })

      const user = await transaction
        .insert(User)
        .values({
          name: ROLE_ADMIN,
          email: `${ROLE_ADMIN}@example.com`,
          role: ROLE_ADMIN
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
