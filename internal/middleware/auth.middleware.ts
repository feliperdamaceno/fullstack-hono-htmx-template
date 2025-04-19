import type { Context, Next } from 'hono'

import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'

import { InternalServerError } from '#exceptions/http'
import { env } from '#validators/env'

export function authenticate() {
  const middleware = jwt({
    secret: env.JWT_SECRET,
    cookie: env.JWT_COOKIE_NAME
  })

  return async (ctx: Context, next: Next) => {
    try {
      await middleware(ctx, next)
    } catch (error) {
      if (error instanceof HTTPException && error.status === 401) {
        return ctx.redirect('/login')
      }

      console.error('Unexpected error during JWT authentication:', error)
      throw new InternalServerError()
    }
  }
}
