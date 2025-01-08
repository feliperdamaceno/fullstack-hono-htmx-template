import 'dotenv/config'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '#database/schema'

const client = new Pool()

export const database = drizzle({
  client,
  schema,
  logger: process.env.NODE_ENV !== 'production'
})
