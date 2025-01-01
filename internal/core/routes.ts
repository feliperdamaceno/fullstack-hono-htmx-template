import type { RouterInstance } from '#type/core.type'

import rootHandler from '#handler/root.handler'

/**
 * Loads application routes into the provided router instance.
 *
 * This function registers all the routes and their corresponding handlers.
 *
 * @param router - The router instance where the routes will be registered.
 */
export function loadRoutes(router: RouterInstance) {
  /* View Routes */
  router.route('/', rootHandler)

  /* API Routes */
  router.get('/api/healthcheck', (ctx) => {
    return ctx.json({
      status: 'ok',
      message: 'Service is up and running',
      timestamp: new Date().toISOString()
    })
  })
}
