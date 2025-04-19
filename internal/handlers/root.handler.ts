import type { AppInstance } from '#core/app'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'

import { InternalServerError, NotFoundError } from '#exceptions/http'
import { AuthService } from '#services/auth.service'

export class RootHandler {
  public readonly router: RouterInstance
  public readonly authService: AuthService

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.authService = app.container.resolve('AuthService')

    this.router.get('/', async (ctx) => {
      try {
        const view = await app.view.render('home', {
          title: 'Home',
          name: 'admin'
        })

        return ctx.html(view)
      } catch (error) {
        if (error instanceof NotFoundError) throw error
        throw new InternalServerError()
      }
    })

    this.router.post('/register', async (ctx) => {
      try {
        const body = await ctx.req.json()
        const user = await this.authService.register(body)
        return ctx.json(user)
      } catch (error) {
        if (error instanceof NotFoundError) throw error
        throw new InternalServerError()
      }
    })
  }
}
