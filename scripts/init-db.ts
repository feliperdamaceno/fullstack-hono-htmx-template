import { database } from '#database/driver'
import { Role } from '#models/user.model'

const ADMIN_ROLE_PK = 'admin' as const
const USER_ROLE_PK = 'user' as const

async function init() {
  try {
    await database.transaction(async (transaction) => {
      await transaction.insert(Role).values({ name: ADMIN_ROLE_PK })
      await transaction.insert(Role).values({ name: USER_ROLE_PK })
      console.log('Database successfully initialized!')
    })
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

init()
