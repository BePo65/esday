import type { EsDayPlugin } from 'esday'

declare module 'esday' {
  interface EsDay {
    dayOfYear(): number
    dayOfYear(dayOfYear: number): EsDay
  }
}

const SECONDS_A_DAY = 86_400

const dayOfYearPlugin: EsDayPlugin<{}> = (_, dayClass, dayFactory) => {
  // @ts-expect-error function is compatible with its overload
  dayClass.prototype.dayOfYear = function (input?: number) {
    const dayOfYear =
      Math.round(
        (dayFactory(this).startOf('day').valueOf() - dayFactory(this).startOf('year').valueOf()) /
          SECONDS_A_DAY /
          1000,
      ) + 1
    return input === undefined ? dayOfYear : this.add(input - dayOfYear, 'day')
  }
}

export default dayOfYearPlugin
