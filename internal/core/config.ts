import type { AppConfig, Origins } from '#types/config.types'

import { env } from '#validators/env'

/**
 * Loads and returns the application configuration.
 *
 * Returns a tuple with the config or an error. Config is read-only.
 */
export function loadConfig(): [Readonly<AppConfig>, null] | [null, Error] {
  try {
    const config: Readonly<AppConfig> = {
      hostname: env.HOST,
      port: env.PORT,
      allowedOrigins: allowedOrigins(),
      allowMethods: [
        'GET',
        'HEAD',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS',
        'TRACE',
        'CONNECT'
      ],
      allowHeaders: [
        'HX-Boosted',
        'HX-Current-URL',
        'HX-History-Restore-Request',
        'HX-Prompt',
        'HX-Request',
        'HX-Target',
        'HX-Trigger-Name',
        'HX-Trigger'
      ],
      exposeHeaders: [
        'HX-Location',
        'HX-Push-Url',
        'HX-Redirect',
        'HX-Refresh',
        'HX-Replace-Url',
        'HX-Reswap',
        'HX-Retarget',
        'HX-Reselect',
        'HX-Trigger',
        'HX-Trigger-After-Settle',
        'HX-Trigger-After-Swap'
      ],
      views: '/internal/views/pages'
    } as const

    return [config, null]
  } catch (error) {
    if (error instanceof Error) return [null, error]
    throw error
  }
}

/**
 * Returns allowed CORS origins based on the current environment.
 * Can be extended to include more endpoints as needed.
 */
function allowedOrigins() {
  const origins: Origins = {
    development: [`http://${env.HOST}:${env.PORT}`],
    test: ['*'],
    qa: ['*'],
    staging: ['*'],
    production: ['*']
  }

  return origins[env.NODE_ENV]
}
