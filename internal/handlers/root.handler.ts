import type { AppInstance } from '#core/app'
import type { UserService } from '#services/user.service'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '#exceptions/http'

export class RootHandler {
  public readonly router: RouterInstance
  public readonly userService: UserService

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.userService = app.container.resolve('UserService')

    this.router.get('/', async (ctx) => {
      try {
        const view = await app.view.render('home', {
          title: 'Home',
          name: 'admin'
        })

        return ctx.html(view)
      } catch (error) {
        if (error instanceof NotFoundError) throw error

        console.error(error)
        throw new InternalServerError()
      }
    })

    this.router.post('/register', async (ctx) => {
      try {
        const body = await ctx.req.json()
        const user = await this.userService.create(body)
        return ctx.json(user)
      } catch (error) {
        if (error instanceof BadRequestError) throw error
        if (error instanceof NotFoundError) throw error
        if (error instanceof InternalServerError) throw error

        console.error(error)
        throw new InternalServerError()
      }
    })
  }
}
