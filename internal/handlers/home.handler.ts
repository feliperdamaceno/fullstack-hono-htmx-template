import type { AppInstance } from '#core/app'
import type { UserRepository } from '#repositories/user.repository'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'

import { InternalServerError, NotFoundError } from '#exceptions/http'
import { authenticate } from '#middleware/auth.middleware'

export class HomeHandler {
  public readonly router: RouterInstance
  public readonly userRepository: UserRepository

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.userRepository = app.container.resolve('UserRepository')

    this.router.get('/', authenticate(), async (ctx) => {
      try {
        const { email } = ctx.get('jwtPayload')

        const user = await this.userRepository.getByEmail(email)
        if (!user) {
          throw new NotFoundError(`User "${email}" not found.`)
        }

        const view = await app.view.render('pages/home', {
          name: user?.name
        })

        return ctx.html(view)
      } catch (error) {
        if (error instanceof NotFoundError) throw error

        console.error('Unexpected error in /:', error)
        throw new InternalServerError()
      }
    })
  }
}
