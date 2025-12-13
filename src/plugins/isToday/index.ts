import type { EsDayPlugin } from 'esday'
import { C } from '~/common'

declare module 'esday' {
  interface EsDay {
    isToday: () => boolean
  }
}

const isTodayPlugin: EsDayPlugin<{}> = (_, dayClass) => {
  dayClass.prototype.isToday = function () {
    return this.isSame(new Date(), C.DAY)
  }
}

export default isTodayPlugin
