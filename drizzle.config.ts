import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './internal/database/migrations',
  schema: './internal/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: process.env.NODE_ENV !== 'production',
  strict: true
})
