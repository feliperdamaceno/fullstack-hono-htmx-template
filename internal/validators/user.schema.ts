import { z } from 'zod/v4'

export const NameSchema = z
  .string()
  .min(2, { error: 'Name must be at least 2 characters long.' })
  .max(255, { error: 'Name must be at most 255 characters long.' })
  .regex(/^[a-zA-Z\s'-]+$/, {
    error: 'Name can only contain letters, spaces, apostrophes, and hyphens.'
  })

export const EmailSchema = z.email({
  error: 'Invalid email format. Please provide a valid email address.'
})

export const PasswordSchema = z
  .string()
  .min(8, {
    error: 'Password must be at least 8 characters long.'
  })
  .regex(/[A-Z]/, {
    error: 'Password must contain at least one uppercase letter.'
  })
  .regex(/[a-z]/, {
    error: 'Password must contain at least one lowercase letter.'
  })
  .regex(/[0-9]/, {
    error: 'Password must contain at least one number.'
  })
  .regex(/[^a-zA-Z0-9]/, {
    error:
      'Password must contain at least one special character (e.g., !, @, #, $, etc.).'
  })
