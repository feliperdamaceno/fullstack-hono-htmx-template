import type { RouterInstance } from '#app/app'

import homepageHandler from '#handler/homepage.handler'

export function LoadRoutes(router: RouterInstance) {
  /**
   * Application routes
   */
  router.route('/', homepageHandler)

  /**
   * Misc. routes
   */
  router.get('/api/healthcheck', (ctx) => {
    return ctx.json({ message: 'Operational!' })
  })
}
