import type { AppInstance } from '#core/app'

import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
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

  /* Static Files */
  app.router.use('/static/*', serveStatic({ root: './internal/view/' }))
  app.router.use(
    '/favicon.ico',
    serveStatic({ path: './internal/view/static/favicon.ico' })
  )
}
