import { z } from 'zod'

const ENVIRONMENTS = [
  'development',
  'test',
  'qa',
  'staging',
  'production'
] as const

const schema = z.object({
  HOST: z.string().trim().min(1, { message: 'HOST is required' }),
  PORT: z.preprocess(
    (port) => Number(port),
    z
      .number()
      .min(1)
      .max(65535, { message: 'PORT must be between 1 and 65535' })
  ),
  DATABASE_URL: z
    .string()
    .trim()
    .min(1, { message: 'DATABASE_URL is required' })
    .url({ message: 'DATABASE_URL must be a valid URL' }),
  JWT_SECRET: z
    .string()
    .min(32, { message: 'Secret must be at least 32 characters long' })
    .regex(/[A-Z]/, {
      message: 'Secret must contain at least one uppercase letter'
    })
    .regex(/[a-z]/, {
      message: 'Secret must contain at least one lowercase letter'
    })
    .regex(/[0-9]/, { message: 'Secret must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Secret must contain at least one special character'
    })
    .refine((value) => value.length <= 128, {
      message: 'Secret should not exceed 128 characters'
    }),
  NODE_ENV: z.enum(ENVIRONMENTS, {
    message: `NODE_ENV must be one of following options: ${ENVIRONMENTS.join(', ')}`
  })
})

export const env = schema.parse(process.env)
