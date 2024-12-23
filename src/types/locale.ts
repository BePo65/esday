// From https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript
type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, readonly [T, ...R]>

export type DayNames<T = string> = Tuple<T, 7>
export type MonthNames<T = string> = Tuple<T, 12>
export interface MonthNamesFunction<T = MonthNames<string>> {
  (format: string): string
  standalone: T
  format: T
}
export type RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  range: string
) => string

type Format =
  | 'LT'
  | 'LTS'
  | 'L'
  | 'LL'
  | 'LLL'
  | 'LLLL'
  | 'l'
  | 'll'
  | 'lll'
  | 'llll'
type Relative =
  | 'future'
  | 'past'
  | 's'
  | 'm'
  | 'mm'
  | 'h'
  | 'hh'
  | 'd'
  | 'dd'
  | 'M'
  | 'MM'
  | 'y'
  | 'yy'

// Type definition of locale (usually a literal object)
export interface Locale {
  /**
   * Name of the locale
   */
  name: string
  /**
   * Array of full day names
   * @example ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   */
  weekdays: DayNames
  /**
   * Array of short versions of day names
   * @example ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   */
  weekdaysShort?: DayNames
  weekdaysMin?: DayNames
  months: MonthNames | MonthNamesFunction
  monthsShort?: MonthNames | MonthNamesFunction
  ordinal?: (number: number, period?: 'W') => string
  weekStart?: number
  yearStart?: number
  formats?: Partial<Record<Format, string>>
  relativeTime?: Record<Relative, string | RelativeTimeElementFunction>
  meridiem?: (hour: number, minute: number, isLowercase: boolean) => string
  invalidDate?: string
}
