import type { EsDayPlugin } from 'esday'
import { C } from '~/common'

declare module 'esday' {
  interface EsDay {
    isYesterday: () => boolean
  }
}

const isYesterdayPlugin: EsDayPlugin<{}> = (_, dayClass, d) => {
  dayClass.prototype.isYesterday = function () {
    const comparisonTemplate = 'YYYY-MM-DD'
    const yesterday = d().subtract(1, C.DAY)

    return this.format(comparisonTemplate) === yesterday.format(comparisonTemplate)
  }
}

export default isYesterdayPlugin
