import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from 'internal/validators/env.ts'
import { Pool } from 'pg'

import * as schema from '#database/schema'

const client = new Pool({
  connectionString: env.DATABASE_URL
})

export const database = drizzle({
  client,
  schema,
  logger: env.NODE_ENV !== 'production'
})
