import type { AppConfig } from '#type/config.type'
import type { RouterInstance } from '#type/core.type'
import type { Database } from '#type/database.types'

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { loadRoutes } from 'internal/core/routes.ts'
import { ViewEngine } from 'internal/core/views.ts'

import { loadConfig } from '#config/config'

import { database } from '#database/client'

/**
 * The `App` class represents the core application, setting up the router, middleware,
 * loading configuration, initializing the view engine, and starting the server.
 */
class App {
  #config: AppConfig
  router: RouterInstance
  view: ViewEngine
  db: Database

  constructor() {
    this.router = new Hono()

    /**
     * Register global middleware for the application.
     */
    this.router.use(logger())
    this.router.use('/static/*', serveStatic({ root: './internal/view/' }))
    this.router.use(
      '/favicon.ico',
      serveStatic({ path: './internal/view/static/favicon.ico' })
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

    /**
     * Initialize the database client instance.
     */
    this.db = database
  }

  /**
   * Initialize the application by exporting the server.
   * The server will listen on the configured hostname and port.
   */
  init() {
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

    return {
      fetch: this.router.fetch,
      hostname: this.#config.hostname,
      port: this.#config.port
    }
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
