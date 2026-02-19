/**
 * Cache for Intl.DateTimeFormat instances for formatting date and time
 * used to improve performance.
 * The key is a combination of timezone and timeZoneName.
 */
const dtfCacheDateTime: Record<string, Intl.DateTimeFormat> = {}
const dtfCacheTimezoneName: Record<string, Intl.DateTimeFormat> = {}

export const TzDefaultTimezoneLocale = 'en-US'

/**
 * Get a cached or newly created Intl.DateTimeFormat instance for date/time formats.
 *
 * This function caches Intl.DateTimeFormat objects since their creation
 * is relatively slow. It returns a formatter configured for date and time values
 * using the given timezone.
 *
 * @param timezone - The IANA timezone identifier (e.g., "Asia/Shanghai").
 * @returns A cached or new Intl.DateTimeFormat instance.
 */
export function getDateTimeFormat(timezone: string): Intl.DateTimeFormat {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
  }

  if (timezone.length > 0) {
    // the timezone defaults to the timezone of the runtime used
    formatOptions['timeZone'] = timezone
  }

  // Create a cache key based on timezone and a fixed string
  const key = `${timezone}|formatDateTime`

  // Try to retrieve formatter from cache;
  // if not found, create and cache a new one
  let dtf = dtfCacheDateTime[key]
  if (!dtf) {
    // always use locale 'en-US', as we want to get the day-of-week from the weekday name
    dtf = new Intl.DateTimeFormat('en-US', formatOptions)
    dtfCacheDateTime[key] = dtf
  }

  // Return the formatter
  return dtf
}

/**
 * Get a cached or newly created Intl.DateTimeFormat instance for timezone name formats.
 *
 * This function caches Intl.DateTimeFormat objects since their creation
 * is relatively slow. It returns a formatter configured for timezone names using
 * the given timezone and locale name.
 *
 * @param timezone - The IANA timezone identifier (e.g., "Asia/Shanghai").
 * @param localeName - Optional settings for the name of the locale to use.
 * @returns A cached or new Intl.DateTimeFormat instance.
 */
export function getTimezoneNameFormat(
  timezone: string,
  localeName: string = TzDefaultTimezoneLocale,
): Intl.DateTimeFormat {
  // we cannot format timeZoneName only; as a minimum we need year
  // and month values too
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    timeZoneName: 'short',
  }

  if (timezone.length > 0) {
    // the timezone defaults to the timezone of the runtime used
    formatOptions['timeZone'] = timezone
  }

  // Create a cache key based on timezone and a fixed string
  const key = `${timezone}|localeName|timezoneName`

  // Try to retrieve formatter from cache;
  // if not found, create and cache a new one
  let dtf = dtfCacheTimezoneName[key]
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(localeName, formatOptions)
    dtfCacheTimezoneName[key] = dtf
  }

  // Return the formatter
  return dtf
}
