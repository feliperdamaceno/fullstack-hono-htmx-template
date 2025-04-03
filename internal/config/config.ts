import type { AppConfig } from '#type/config.type'

import dotenv from 'dotenv'

export function loadConfig(): [Readonly<AppConfig>, null] | [null, Error] {
  try {
    dotenv.config()

    const config: Readonly<AppConfig> = {
      hostname: getEnv('HOST', 'localhost'),
      port: Number.parseInt(getEnv('PORT', '8000')),
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

// TODO: Convert this to Bun!
// Chage to import.meta instead.
function getEnv(key: string, defaultValue: string) {
  const value = process.env[key]

  if (value === undefined) {
    return defaultValue
  }

  return value
}
