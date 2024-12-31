import dotenv from 'dotenv'

type AppConfig = {
  hostname: string
  port: number
}

export function NewConfig(): [AppConfig, null] | [null, Error] {
  try {
    dotenv.config()

    const config: AppConfig = {
      hostname: getEnv('HOST', 'localhost'),
      port: Number.parseInt(getEnv('PORT', '3000'))
    }

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
