import type { AppInstance } from '#core/app'
import type { TimeValue } from '#helpers/time.helper'
import type { AuthService } from '#services/auth.service'
import type { UserService } from '#services/user.service'
import type { RouterInstance } from '#types/core.types'

import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'

import { ms } from '#helpers/time.helper'

import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '#exceptions/http'
import { env } from '#validators/env'

export class AuthHandler {
  public readonly router: RouterInstance
  public readonly userService: UserService
  public readonly authService: AuthService

  constructor(app: AppInstance) {
    this.router = new Hono()
    this.userService = app.container.resolve('UserService')
    this.authService = app.container.resolve('AuthService')

    this.router.get('/register', async (ctx) => {
      const view = await app.view.render('register')
      return ctx.html(view)
    })

    this.router.post('/register', async (ctx) => {
      try {
        const body = await ctx.req.parseBody()

        const user = await this.userService.create({
          name: String(body.name),
          email: String(body.email),
          password: String(body.password),
          role: String(body.role)
        })

        ctx.status(302)
        return ctx.header('HX-Redirect', user ? '/login' : '/register')
      } catch (error) {
        if (error instanceof BadRequestError) throw error
        if (error instanceof NotFoundError) throw error
        if (error instanceof InternalServerError) throw error

        console.error('Unexpected error in /register:', error)
        throw new InternalServerError()
      }
    })

    this.router.get('/login', async (ctx) => {
      const view = await app.view.render('login')
      return ctx.html(view)
    })

    this.router.post('/login', async (ctx) => {
      try {
        const body = await ctx.req.parseBody()

        const token = await this.authService.login(
          String(body.email),
          String(body.password)
        )

        const expiresInMs = ms(env.JWT_EXPIRES_IN as TimeValue)
        const expiresAt = new Date(Date.now() + expiresInMs)

        setCookie(ctx, env.JWT_COOKIE_NAME, token, {
          path: '/',
          maxAge: Math.floor(expiresInMs / 1000) /* seconds */,
          expires: expiresAt /* date */,
          httpOnly: env.NODE_ENV === 'production',
          sameSite: 'Strict',
          secure: env.NODE_ENV === 'production'
        })

        ctx.status(302)
        return ctx.header('HX-Redirect', '/')
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

      ctx.status(302)
      return ctx.header('HX-Redirect', '/login')
    })
  }
}
