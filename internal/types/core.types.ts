import type { Hono } from 'hono'
import type { BlankEnv, BlankSchema } from 'hono/types'

/*
  TODO: Pass the `Variables` as Generics to the constructor of Hono to make it type-safe.
  * used for context type-safety
*/
export type RouterInstance = Hono<BlankEnv, BlankSchema, '/'>
