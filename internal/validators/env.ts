import { z } from 'zod/v4'

const ENVIRONMENTS = [
  'development',
  'test',
  'qa',
  'staging',
  'production'
] as const

const schema = z.object({
  HOST: z.string().trim().min(1, { error: 'HOST is required' }),
  PORT: z.preprocess(
    (port) => Number(port),
    z.number().min(1).max(65535, { error: 'PORT must be between 1 and 65535' })
  ),
  DATABASE_URL: z.url().trim().min(1, { error: 'DATABASE_URL is required' }),
  JWT_SECRET: z
    .string()
    .trim()
    .min(32, { error: 'Secret must be at least 32 characters long' })
    .regex(/[A-Z]/, {
      error: 'Secret must contain at least one uppercase letter'
    })
    .regex(/[a-z]/, {
      error: 'Secret must contain at least one lowercase letter'
    })
    .regex(/[0-9]/, { error: 'Secret must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Secret must contain at least one special character'
    })
    .refine((value) => value.length <= 128, {
      error: 'Secret should not exceed 128 characters'
    }),
  JWT_COOKIE_NAME: z
    .string()
    .trim()
    .min(1, { error: 'JWT_COOKIE_NAME is required' }),
  JWT_EXPIRES_IN: z
    .string()
    .trim()
    .min(1, { error: 'JWT_EXPIRES_IN is required' })
    .regex(/^(\d+)([smhdwMy]{1})$/, {
      error:
        'AUTH_COOKIE_LIFETIME must be a valid duration (e.g., 30d, 1h, 12m)'
    }),
  NODE_ENV: z.enum(ENVIRONMENTS, {
    error: `NODE_ENV must be one of following options: ${ENVIRONMENTS.join(', ')}`
  })
})

export const env = schema.parse(process.env)
