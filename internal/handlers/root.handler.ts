import type { AppInstance } from '#core/app'
import type { UserRepository } from '#repositories/user.repository'
import type { AuthService } from '#services/auth.service'
import type { UserService } from '#services/user.service'
import type { RouterInstance } from '#types/core.types'
import type { StringValue } from 'ms'

import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import ms from 'ms'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '#exceptions/http'
import { authenticate } from '#middleware/auth.middleware'
import { env } from '#validators/env'

export class RootHandler {
  public readonly router: RouterInstance
  public readonly userRepository: UserRepository
  public readonly userService: UserService
  public readonly authService: AuthService

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.userRepository = app.container.resolve('UserRepository')
    this.userService = app.container.resolve('UserService')
    this.authService = app.container.resolve('AuthService')

    this.router.get('/', authenticate(), async (ctx) => {
      try {
        const { email } = ctx.get('jwtPayload')

        const user = await this.userRepository.getByEmail(email)
        if (!user) {
          throw new NotFoundError(`User "${email}" not found.`)
        }

        const view = await app.view.render('home', {
          title: 'Home',
          name: user?.name
        })

        return ctx.html(view)
      } catch (error) {
        if (error instanceof NotFoundError) throw error

        console.error('Unexpected error in /:', error)
        throw new InternalServerError()
      }
    })

    this.router.post('/register', async (ctx) => {
      try {
        const body = await ctx.req.json()
        const user = await this.userService.create(body)

        ctx.status(201)
        return ctx.text(`Welcome ${user.email}!`)
      } catch (error) {
        if (error instanceof BadRequestError) throw error
        if (error instanceof NotFoundError) throw error
        if (error instanceof InternalServerError) throw error

        console.error('Unexpected error in /register:', error)
        throw new InternalServerError()
      }
    })

    this.router.get('/login', async (ctx) => {
      return ctx.text('login')
    })

    this.router.post('/login', async (ctx) => {
      try {
        const { email, password } = await ctx.req.json()
        const token = await this.authService.login(email, password)

        const expiresInMs = ms(env.JWT_EXPIRES_IN as StringValue)
        const expiresAt = new Date(Date.now() + expiresInMs)

        setCookie(ctx, env.JWT_COOKIE_NAME, token, {
          path: '/',
          maxAge: Math.floor(expiresInMs / 1000) /* seconds */,
          expires: expiresAt /* date */,
          httpOnly: env.NODE_ENV === 'production',
          sameSite: 'Strict',
          secure: env.NODE_ENV === 'production'
        })

        ctx.status(200)
        return ctx.text('Login successful.')
      } catch (error) {
        if (error instanceof BadRequestError) throw error

        console.error('Unexpected error in /login:', error)
        throw new InternalServerError()
      }
    })

    this.router.post('/logout', async (ctx) => {
      setCookie(ctx, env.JWT_COOKIE_NAME, '', {
        path: '/',
        maxAge: 0,
        expires: new Date(0) /* epoch */,
        httpOnly: env.NODE_ENV === 'production',
        sameSite: 'Strict',
        secure: env.NODE_ENV === 'production'
      })

      ctx.status(200)
      return ctx.text('You have been logged out successfully.')
    })

    /**
     * This is a test endpoint that shows how to handle JWT authentication.
     */
    this.router.get('/me', authenticate(), async (ctx) => {
      const { email } = ctx.get('jwtPayload')

      ctx.status(200)
      return ctx.json(`Hello, ${email}`)
    })
  }
}
