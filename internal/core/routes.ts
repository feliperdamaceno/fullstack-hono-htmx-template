import type { AppInstance } from '#core/app'

import { AuthHandler } from '#handlers/auth.handler'
import { HomeHandler } from '#handlers/home.handler'

/**
 * Loads application routes into the provided app instance.
 *
 * This function registers all the routes and their corresponding handlers.
 *
 * @param app - The app instance where the routes will be registered.
 */
export function loadRoutes(app: AppInstance) {
  app.router.route('/', new HomeHandler(app).router)
  app.router.route('/', new AuthHandler(app).router)
}
