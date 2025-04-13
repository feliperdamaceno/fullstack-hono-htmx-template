import type { HttpMethods } from '#type/http.type'
import type { env } from '#validator/env'

export type AppConfig = {
  hostname: string
  port: number
  allowedOrigins: string[]
  allowMethods: HttpMethods[]
  allowHeaders: string[]
  exposeHeaders: string[]
  views: string
}

export type Origins = {
  [key in typeof env.NODE_ENV]: string[]
}
