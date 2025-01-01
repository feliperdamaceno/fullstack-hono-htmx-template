import type { AppConfig } from '#type/config.type'
import type { RouterInstance } from '#type/core.type'

import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { loadRoutes } from 'internal/core/routes.js'
import { ViewEngine } from 'internal/core/views.js'

import { loadConfig } from '#config/config'

/**
 * The `App` class represents the core application, setting up the router, middleware,
 * loading configuration, initializing the view engine, and starting the server.
 */
class App {
  #config: AppConfig
  router: RouterInstance
  view: ViewEngine

  constructor() {
    this.router = new Hono()

    /**
     * Register global middleware for the application.
     */
    this.router.use(logger())
    this.router.use('/static/*', serveStatic({ root: './internal/view/' }))
    this.router.use(
      '/favicon.ico',
      serveStatic({ path: './internal/view/static/assets/favicon.ico' })
    )

    /**
     * Load application routes.
     * This function loads route definitions into the router instance.
     */
    loadRoutes(this.router)

    /**
     * Load application configuration.
     * If loading the config fails, log the error and terminate the process.
     */
    const [config, err] = loadConfig()

    if (err) {
      console.error(err)
      process.exit(1)
    }

    /**
     * Initialize the view engine with the loaded configuration.
     * The view engine is responsible for rendering views/pages.
     */
    this.#config = config
    this.view = new ViewEngine(this.#config.views)
  }

  /**
   * Starts the application by initializing the server.
   * The server will listen on the configured hostname and port.
   */
  start() {
    serve({
      fetch: this.router.fetch,
      hostname: this.#config.hostname,
      port: this.#config.port
    })

    console.log(
      `Server is now listening on http://${this.#config.hostname}:${this.#config.port}`
    )

    process.on('SIGINT', () => {
      console.log('\nReceived SIGINT. Shutting down...')
      this.#stop()
      process.exit(0)
    })

    process.on('SIGTERM', () => {
      console.log('\nReceived SIGTERM. Shutting down...')
      this.#stop()
      process.exit(0)
    })
  }

  /**
   * Cleans up resources before shutdown (e.g., closes connections, stops tasks).
   * Called on termination signals (`SIGINT`, `SIGTERM`).
   */
  #stop() {
    // Perform cleanup tasks here before termination
  }
}

export const app = new App()
