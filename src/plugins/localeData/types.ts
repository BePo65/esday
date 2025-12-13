import type { EsDay } from 'esday'
import type {
  Calendar,
  DayNames,
  LocaleFormatKeys,
  MonthNames,
  RelativeTimeKeys,
} from '../locale/types'

declare module 'esday' {
  interface EsDay {
    localeData(): LocaleData
  }

  interface EsDayFactory {
    localeData(localeName?: string): LocaleData
    months(): MonthNames
    monthsShort(): MonthNames
    weekdays(): DayNames
    weekdaysShort(): DayNames
    weekdaysMin(): DayNames
  }
}

export interface LocaleData {
  weekdays(): string[]
  weekdays(date: EsDay, format?: string): string
  weekdaysShort(): string[]
  weekdaysShort(date: EsDay, format?: string): string
  weekdaysMin(): string[]
  weekdaysMin(date: EsDay, format?: string): string
  months(): MonthNames
  months(date: EsDay, format?: string): string
  monthsShort(): MonthNames
  monthsShort(date: EsDay, format?: string): string
  ordinal(number: number, period?: string): string
  firstDayOfWeek(): number
  firstDayOfYear(): number
  longDateFormat(key: LocaleFormatKeys): string
  calendar(key?: keyof Calendar, date?: EsDay, now?: EsDay): string
  relativeTime(
    timeValue: string | number,
    withoutSuffix: boolean,
    token: RelativeTimeKeys,
    isFuture: boolean,
  ): string
  meridiem(hour: number, minute: number, isLower: boolean): string
  preParse?(dateString: string): string
  postFormat?(formattedDate: string): string
}
