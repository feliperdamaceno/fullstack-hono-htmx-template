import type { AppConfig } from '#type/config.type'

import { env } from '#validator/env'

export function loadConfig(): [Readonly<AppConfig>, null] | [null, Error] {
  try {
    const config: Readonly<AppConfig> = {
      hostname: env.HOST,
      port: env.PORT,
      views: '/internal/view/pages'
    } as const

    return [config, null]
  } catch (err) {
    if (err instanceof Error) {
      return [null, err]
    }

    throw err
  }
}
