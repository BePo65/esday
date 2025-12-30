/**
 * Cache for Intl.DateTimeFormat instances to improve performance.
 * The key is a combination of timezone and timeZoneName.
 */
const dtfCache: Record<string, Intl.DateTimeFormat> = {}

/**
 * Options for getDateTimeFormat function.
 */
interface GetDateTimeFormatOptions {
  /**
   * The format of the time zone name.
   * Defaults to 'short' if not provided.
   */
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric'
}

/**
 * Get a cached or newly created Intl.DateTimeFormat instance.
 *
 * This function caches Intl.DateTimeFormat objects since their creation
 * is relatively slow. It returns a formatter configured for the given
 * timezone and time zone name format.
 *
 * @param timezone - The IANA timezone identifier (e.g., "Asia/Shanghai").
 * @param options - Optional settings for the formatter, specifically timeZoneName.
 * @returns A cached or new Intl.DateTimeFormat instance.
 */
export function getDateTimeFormat(
  timezone: string,
  options: GetDateTimeFormatOptions = {},
): Intl.DateTimeFormat {
  // Use the provided timeZoneName or default to 'short'
  const timeZoneName = options.timeZoneName || 'short'

  // Create a cache key based on timezone and timeZoneName
  const key = `${timezone}|${timeZoneName}`

  // Try to retrieve formatter from cache
  let dtf = dtfCache[key]

  // If not found, create and cache a new one
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: timeZoneName,
  }
  if (timezone?.length > 0) {
    formatOptions['timeZone'] = timezone
  }
  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', formatOptions)
    dtfCache[key] = dtf
  }

  // Return the formatter
  return dtf
}
