export const SECONDS_A_MINUTE = 60
export const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60
export const SECONDS_A_DAY = SECONDS_A_HOUR * 24
export const SECONDS_A_WEEK = SECONDS_A_DAY * 7

export const MILLISECONDS_A_SECOND = 1e3
export const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND
export const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND
export const MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND
export const MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND
export const MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365
export const MILLISECONDS_A_MONTH = MILLISECONDS_A_YEAR / 12
export const MILLISECONDS_A_QUARTER = MILLISECONDS_A_MONTH * 3

export const INDEX_SUNDAY = 0
export const INDEX_MONDAY = 1
export const INDEX_WEDNESDAY = 3
export const INDEX_THURSDAY = 4

// 'as const' is required to make these values usable as units
export const MS = 'millisecond' as const
export const SECOND = 'second' as const
export const MIN = 'minute' as const
export const HOUR = 'hour' as const
export const DAY = 'day' as const
export const WEEK = 'week' as const
export const ISOWEEK = 'isoWeek' as const
export const MONTH = 'month' as const
export const QUARTER = 'quarter' as const
export const YEAR = 'year' as const
export const DAY_OF_MONTH = 'date' as const

export const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'

export const INVALID_DATE = new Date('')
export const INVALID_DATE_STRING = 'Invalid date'

// regex
export const REGEX_PARSE_DEFAULT =
  /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[T\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/i

export default {
  SECONDS_A_MINUTE,
  SECONDS_A_HOUR,
  SECONDS_A_DAY,
  SECONDS_A_WEEK,
  MILLISECONDS_A_SECOND,
  MILLISECONDS_A_MINUTE,
  MILLISECONDS_A_HOUR,
  MILLISECONDS_A_DAY,
  MILLISECONDS_A_WEEK,
  MILLISECONDS_A_QUARTER,
  MILLISECONDS_A_MONTH,
  MILLISECONDS_A_YEAR,
  INDEX_SUNDAY,
  INDEX_MONDAY,
  INDEX_WEDNESDAY,
  INDEX_THURSDAY,
  MS,
  SECOND,
  MIN,
  HOUR,
  DAY,
  WEEK,
  ISOWEEK,
  MONTH,
  QUARTER,
  YEAR,
  DAY_OF_MONTH,
  FORMAT_DEFAULT,
  INVALID_DATE,
  INVALID_DATE_STRING,
  REGEX_PARSE_DEFAULT,
}
