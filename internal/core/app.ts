import type { Bindings } from '#core/bindings'
import type { AppConfig } from '#types/config.types'
import type { RouterInstance } from '#types/core.types'
import type { Database } from '#types/database.types'

import { Hono } from 'hono'

import { loadBindings } from '#core/bindings'
import { loadConfig } from '#core/config'
import { Container } from '#core/container'
import { loadMiddleware } from '#core/middleware'
import { loadRoutes } from '#core/routes'
import { ViewEngine } from '#core/views'
import { database } from '#database/driver'

/**
 * The `App` class represents the core application, setting up the router, middleware,
 * loading configuration, initializing the view engine, and starting the server.
 */
class App {
  config: AppConfig
  router: RouterInstance
  database: Database
  container: Container<Bindings>
  view: ViewEngine

  constructor() {
    this.router = new Hono()

    /**
     * Load application configuration.
     */
    const [config, error] = loadConfig()
    if (error) {
      console.error(error)
      process.exit(1)
    }
    this.config = config

    /**
     * Initialize the database client, container and view engine.
     */
    this.database = database
    this.container = new Container<Bindings>()
    this.view = new ViewEngine(this.config.views)

    /**
     * Register global bindings, middleware and routes.
     */
    loadBindings(this)
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
