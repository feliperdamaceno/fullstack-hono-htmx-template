import type { AppConfig } from '#type/config.type'

export function loadConfig(): [Readonly<AppConfig>, null] | [null, Error] {
  try {
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

function getEnv(key: string, defaultValue: string) {
  const value = process.env[key]

  if (value === undefined) {
    return defaultValue
  }

  return value
}
