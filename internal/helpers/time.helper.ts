type UnitKey = 'y' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'

type Unit = Uppercase<UnitKey> | Lowercase<UnitKey>

export type TimeValue = `${number}` | `${number}${Unit}` | `${number} ${Unit}`

/**
 * Converts a time string (e.g., "1d", "2h", "30m") to milliseconds.
 *
 * @param time - A time value with a number and unit (e.g., "1d", "2h", "30m").
 *
 * @returns The time in milliseconds, or 0 if the input is invalid.
 */
export function ms(time: TimeValue) {
  if (!time) return 0

  const match = time.trim().match(/^(\d+)\s*(y|w|d|h|m|s|ms)?$/i)
  if (!match || !match[1] || !match[2]) return 0

  const number = parseInt(match[1], 10)
  const unit = match[2].toLowerCase()

  const units: Record<string, number> = {
    ms: 1 /* ms */,
    s: 1000 /* secs to ms */,
    m: 1000 * 60 /* min to ms */,
    h: 1000 * 60 * 60 /* hrs to ms */,
    d: 1000 * 60 * 60 * 24 /* day to ms */,
    w: 1000 * 60 * 60 * 24 * 7 /* weeks to ms */,
    y: 1000 * 60 * 60 * 24 * 365 /* years to ms (365 days) */
  }

  return number * (units[unit] || 0)
}
