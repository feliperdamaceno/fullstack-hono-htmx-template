import type { AuthToken } from '#types/auth.types'
import type { Hono } from 'hono'
import type { JwtVariables } from 'hono/jwt'
import type { BlankEnv } from 'hono/types'

export type RouterInstance = Hono<BlankEnv, JwtVariables<AuthToken>, '/'>
