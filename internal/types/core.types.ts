import type { AuthToken } from '#types/auth.types'
import type { Hono } from 'hono'
import type { JwtVariables } from 'hono/jwt'
import type { BlankSchema } from 'hono/types'

interface RouterEnv {
  Bindings: undefined
  Variables: JwtVariables<AuthToken>
}

export type RouterInstance = Hono<RouterEnv, BlankSchema, '/'>
