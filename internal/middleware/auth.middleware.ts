import type { Context, Next } from 'hono'

import { jwt } from 'hono/jwt'

import { env } from '#validators/env'

export function authenticate() {
  return (ctx: Context, next: Next) => {
    const middleware = jwt({
      secret: env.JWT_SECRET,
      cookie: env.JWT_COOKIE_NAME
    })

    return middleware(ctx, next)
  }
}
