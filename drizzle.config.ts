import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './internal/database/migrations',
  schema: './internal/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  // TODO: Check whether NODE_ENV is available in Bun.
  verbose: process.env.NODE_ENV !== 'production',
  strict: true
})
