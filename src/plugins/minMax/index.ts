import type { DateType, EsDayPlugin } from 'esday'
import { isArray } from '~/common'

declare module 'esday' {
  interface EsDayFactory {
    max: (...dates: DateType[]) => EsDay
    min: (...dates: DateType[]) => EsDay
  }
}

const minMaxPlugin: EsDayPlugin<{}> = (_, _dayClass, dayFactory) => {
  const sortBy = (method: 'isAfter' | 'isBefore', dates: DateType[]) => {
    if (
      !dates ||
      dates.length === 0 ||
      (dates.length === 1 && (!dates[0] || (isArray(dates[0]) && dates[0].length === 0)))
    ) {
      return dayFactory()
    }
    if (dates.length === 1 && isArray(dates[0]) && dates[0].length > 0) {
      dates = dates[0]
    }
    dates = dates.filter((date) => date) // Remove falsy values
    let result = dates[0]
    for (let i = 1; i < dates.length; i++) {
      const inst = dayFactory(dates[i])
      if (!inst.isValid() || inst[method](result)) {
        result = dates[i]
      }
    }
    return dayFactory(result)
  }

  dayFactory.max = (...dates: DateType[]) => sortBy('isAfter', dates)

  dayFactory.min = (...dates: DateType[]) => sortBy('isBefore', dates)
}

export default minMaxPlugin
