import { isArray, isObject } from '~/common'
import type { DateType, EsDayFactory } from '~/types'
import type { SimpleObject, SimpleType } from '~/types/util-types'
import { EsDay } from './EsDay'
import { addFormatTokenDefinitions } from './Impl/format'

// @ts-expect-error plugin declare may cause ts-type-checke error, but it's ok
const esday: EsDayFactory = (
  d?: DateType,
  ...others: (SimpleType | string[] | { [key: string]: SimpleType })[]
) => {
  if (d instanceof EsDay) {
    return d.clone()
  }

  // calling parameters
  const conf: SimpleObject = {}
  others.forEach((o, i) => {
    if (isArray(o)) {
      conf[`args_${i + 1}`] = o
    } else if (isObject(o)) {
      Object.assign(conf, o)
    } else {
      conf[`args_${i + 1}`] = o
    }
  })
  const result = new EsDay(d, conf)

  // remove properties required for parsing only from $conf
  const resultConf = result['$conf']
  for (const property in resultConf) {
    if (property.startsWith('args_')) {
      delete resultConf[property]
    }
  }

  return result
}

esday.addFormatTokenDefinitions = addFormatTokenDefinitions

esday.extend = (plugin, option) => {
  // @ts-expect-error - plugin has property $i (indicator that it has already been installed)
  if (!plugin.$i) {
    // install plugin only once
    // biome-ignore lint/suspicious/noExplicitAny: generic method to install any plugin
    plugin((option || {}) as any, EsDay, esday)
    // @ts-expect-error plugin - create property $i (as an indicator that it has already been installed)
    plugin.$i = true
  }
  return esday
}

export { esday }
