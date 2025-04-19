import type { AppInstance } from '#core/app'

import { RootHandler } from '#handlers/root.handler'

/**
 * Loads application routes into the provided app instance.
 *
 * This function registers all the routes and their corresponding handlers.
 *
 * @param app - The app instance where the routes will be registered.
 */
export function loadRoutes(app: AppInstance) {
  /* View Routes */
  app.router.route('/', new RootHandler(app).router)

  /* API Routes */
  app.router.get('/api/healthcheck', (ctx) => {
    return ctx.json({
      status: 'ok',
      message: 'Service is up and running',
      timestamp: new Date().toISOString()
    })
  })
}
