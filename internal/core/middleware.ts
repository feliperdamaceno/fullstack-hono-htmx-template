import type { AppInstance } from '#core/app'

import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'

/**
 * Registers application middleware on the given app instance.
 *
 * This includes all necessary middleware and their configurations.
 *
 * @param app - The app instance to attach the middleware to.
 */
export function loadMiddleware(app: AppInstance) {
  /* Logging */
  app.router.use(logger())

  /* CORS */
  app.router.use(
    '*',
    cors({
      origin: app.config.allowedOrigins,
      allowMethods: app.config.allowMethods,
      allowHeaders: app.config.allowHeaders,
      exposeHeaders: app.config.exposeHeaders,
      credentials: true
    })
  )

  /* CSRF Protection */
  app.router.use(
    csrf({
      origin: app.config.allowedOrigins
    })
  )

  /* Static Files */
  app.router.use('/static/*', serveStatic({ root: './web/' }))
  app.router.use('/assets/*', serveStatic({ root: './web/' }))
  app.router.use(
    '/favicon.ico',
    serveStatic({ path: './web/assets/favicon.ico' })
  )
}
