import type { AppConfig } from '#types/config.typess'
import type { RouterInstance } from '#types/core.types'
import type { Database } from '#types/database.types'

import { Hono } from 'hono'
import { loadMiddleware } from 'internal/core/middleware.ts'
import { loadRoutes } from 'internal/core/routes.ts'
import { ViewEngine } from 'internal/core/views.ts'

import { loadConfig } from '#core/config'
import { database } from '#database/driver'

/**
 * The `App` class represents the core application, setting up the router, middleware,
 * loading configuration, initializing the view engine, and starting the server.
 */
class App {
  config: AppConfig
  router: RouterInstance
  view: ViewEngine
  database: Database

  constructor() {
    this.router = new Hono()

    /**
     * Load application configuration.
     */
    const [config, err] = loadConfig()
    if (err) {
      console.error(err)
      process.exit(1)
    }
    this.config = config

    /**
     * Initialize the view engine and database client.
     */
    this.view = new ViewEngine(this.config.views)
    this.database = database

    /**
     * Register global middleware and routes.
     */
    loadMiddleware(this)
    loadRoutes(this)
  }

  /**
   * Initializes the application by setting up signal listeners and exporting the server.
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
      hostname: this.config.hostname,
      port: this.config.port
    }
  }

  /**
   * Clean up resources before the application terminates.
   * Called on termination signals (`SIGINT`, `SIGTERM`).
   */
  #stop() {
    /* Perform cleanup tasks here (e.g., close database connections) */
  }
}

export type AppInstance = InstanceType<typeof App>
export const app = new App()
