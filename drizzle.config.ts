import { defineConfig } from 'drizzle-kit'

import { env } from '#validators/env'

export default defineConfig({
  out: './internal/database/migrations',
  schema: './internal/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  verbose: env.NODE_ENV !== 'production',
  strict: true
})
