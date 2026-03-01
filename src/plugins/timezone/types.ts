import type { DateType, EsDay } from 'esday'

interface esdayTz {
  (date: DateType): EsDay
  (date: DateType, timezone: string): EsDay
  (date: DateType, format: string, timezone: string): EsDay
  (date: DateType, format: string, strict: boolean, timezone: string): EsDay
  (date: DateType, format: string, locale: string, timezone: string): EsDay
  (date: DateType, format: string, locale: string, strict: boolean, timezone: string): EsDay
  (date: DateType, format?: string, locale?: string, strict?: boolean, timezone?: string): EsDay
}

declare module 'esday' {
  interface EsDay {
    tz(): string
    tz(timezone: string): EsDay
    tz(timezone: string, isLocal: boolean): EsDay
    tz(timezone?: string, isLocal?: boolean): EsDay
  }

  interface EsDayFactory {
    tz: esdayTz & {
      setDefault: (timezone?: string | undefined) => void
      getDefault: () => string | undefined
      guess: () => string
    }
  }
}
