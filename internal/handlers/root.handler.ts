import type { AppInstance } from '#core/app'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'

import { InternalServerError, NotFoundError } from '#exceptions/http'
import { UserRepository } from '#repositories/user.repository'

export class RootHandler {
  public readonly router: RouterInstance
  private readonly userRepository: UserRepository

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.userRepository = new UserRepository(app.database)

    this.router.get('/', async (ctx) => {
      try {
        const user = await this.userRepository.getByName('admin')

        if (!user?.name) throw new NotFoundError('User "admin" not found')

        const view = await app.view.render('home', {
          title: 'Home',
          name: user.name
        })

        return ctx.html(view)
      } catch (error) {
        if (error instanceof NotFoundError) throw error
        throw new InternalServerError()
      }
    })
  }
}
