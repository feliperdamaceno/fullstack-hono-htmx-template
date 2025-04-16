import type { AppInstance } from '#core/app'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'

import { InternalServerError, NotFoundError } from '#exceptions/http'
import { RoleRepository } from '#repositories/role.repository'
import { UserRepository } from '#repositories/user.repository'
import { AuthService } from '#services/auth.service'
import { UserService } from '#services/user.service'

export class RootHandler {
  public readonly router: RouterInstance

  public readonly authService: AuthService

  constructor(app: AppInstance) {
    this.router = new Hono()

    const userRepository = new UserRepository(app.database)
    const roleRepository = new RoleRepository(app.database)
    const userService = new UserService(userRepository, roleRepository)
    this.authService = new AuthService(userService)

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
