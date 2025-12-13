import type { EsDay } from 'esday'

// From https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript
type ReadonlyTuple<T, N extends number, R extends readonly T[] = []> = R['length'] extends N
  ? R
  : ReadonlyTuple<T, N, readonly [T, ...R]>

declare module 'esday' {
  interface EsDay {
    locale(): string
    locale(localeName: string): EsDay
    localeObject: () => Locale
  }

  interface EsDayFactory {
    locale(): string
    locale(localeName: string): EsDay

    // add locale to list of available Locales
    registerLocale: (locale: Locale, newName?: string) => EsDayFactory

    // remove locale from list of available Locales
    unregisterLocale: (localeName: string) => EsDayFactory

    // get locale object from list of available Locales
    getLocale: (localeName: string) => Locale

    // update locale object in list of available Locales
    updateLocale: (localeName: string, newLocale: Partial<Locale>) => EsDayFactory
  }
}

export type DayNames<T = string> = ReadonlyTuple<T, 7>
export interface DayNamesStandaloneFormat<T = DayNames<string>> {
  format: T // for use as standalone day name
  standalone: T // for use in a format method
  isFormat: RegExp
}

export type MonthNames<T = string> = ReadonlyTuple<T, 12>
export interface MonthNamesStandaloneFormat<T = MonthNames<string>> {
  format: T // for use as standalone month name
  standalone: T // for use in a format method
  isFormat?: RegExp
}
export interface MonthNamesFunction<T = MonthNames<string>> {
  (esdayInstance: EsDay, format: string): string
  format: T // for use in a format method
  standalone: T // for use as standalone month name
}

export type LocaleFormatKeys =
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

export type CalendarSpecValFunction = (this: EsDay, refDate?: EsDay) => string
export type CalendarSpecVal = string | CalendarSpecValFunction
export interface Calendar {
  sameDay: CalendarSpecVal
  nextDay: CalendarSpecVal
  nextWeek: CalendarSpecVal
  lastDay: CalendarSpecVal
  lastWeek: CalendarSpecVal
  sameElse: CalendarSpecVal
}
export type CalendarPartial = Partial<Calendar>

export type RelativeTimeKeys =
  | 'future'
  | 'past'
  | 's'
  | 'ss'
  | 'm'
  | 'mm'
  | 'h'
  | 'hh'
  | 'd'
  | 'dd'
  | 'w'
  | 'ww'
  | 'M'
  | 'MM'
  | 'y'
  | 'yy'

export type RelativeTimeElementFunction = (
  timeValue: string | number,
  withoutSuffix: boolean,
  token: RelativeTimeKeys,
  isFuture: boolean,
) => string

// Type definition of locale (usually a literal object)
export interface Locale {
  /**
   * Name of the locale
   */
  readonly name: string
  /**
   * Array of full day names
   * @example ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   */
  readonly weekdays: DayNames | DayNamesStandaloneFormat
  /**
   * Array of short versions of day names
   * @example ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   */
  readonly weekdaysShort: DayNames
  /**
   * Array of minimal versions of day names
   * @example ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
   */
  readonly weekdaysMin: DayNames
  readonly months: MonthNames | MonthNamesStandaloneFormat | MonthNamesFunction
  readonly monthsShort: MonthNames | MonthNamesStandaloneFormat | MonthNamesFunction
  readonly ordinal: (number: number, period?: string) => string
  readonly weekStart: number
  readonly yearStart: number
  readonly formats: Record<LocaleFormatKeys, string>
  readonly calendar: Calendar
  readonly relativeTime: Record<RelativeTimeKeys, string | RelativeTimeElementFunction>
  readonly meridiem: (hour: number, minute: number, isLowercase: boolean) => string
  readonly preParse?: (dateString: string) => string
  readonly postFormat?: (formattedDate: string) => string
}
