// biome-ignore lint/correctness/noUnusedImports: fix type-check error
import type { EsDay } from 'esday'

declare module 'esday' {
  interface EsDay {
    tz: (timezone: string, isLocal?: boolean) => EsDay
  }

  interface EsDayFactory {
    tz: ((dateStr: string, timezone?: string) => EsDay) & {
      setDefault: (timezone?: string) => void
      getDefault: () => string
      guess: () => string
    }
  }
}
