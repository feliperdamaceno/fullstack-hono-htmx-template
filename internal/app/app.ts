import type { BlankEnv, BlankSchema } from 'hono/types'

import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Edge } from 'edge.js'
import { resolve } from 'node:path'

import { logger } from 'hono/logger'
import { LoadRoutes } from '#app/routes'
import { NewConfig } from '#config/config'

export type RouterInstance = Hono<BlankEnv, BlankSchema, '/'>

class App {
  router!: RouterInstance
  edge!: Edge

  new() {
    if (this.router) {
      return console.warn('app already initialized')
    }

    this.router = new Hono()

    /**
     * Register middlewares
     */
    this.router.use(logger())
    this.router.use(
      '/static/*',
      serveStatic({
        root: './internal/view/'
      })
    )

    /**
     * Load app routes
     */
    LoadRoutes(this.router)

    /**
     * Initialize Edge
     */
    this.edge = Edge.create()
    this.edge.mount(resolve('./internal/view'))
  }

  start() {
    const [config, err] = NewConfig()

    if (err) {
      console.error(err)
      process.exit(1)
    }

    serve({
      fetch: this.router.fetch,
      hostname: config.hostname,
      port: config.port
    })

    console.log(
      `Server is now listening on http://${config.hostname}:${config.port}`
    )
  }
}

export const app = new App()
