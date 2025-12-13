# Locale

Locale extends `esday` to support locales by adding the `locale`, the `registerLocale` and the `unregisterLocale` methods.

`EsDay` objects get the `locale` and the `localeObject` methods.

The locale to use can be loaded from the corresponding locale file ([list of supported locales](../locales/locales.md)).

**Note**: the name of the locale (e.g. used for setting the locale) is case sensitive.

## Usage

### Dependencies
Locale has no dependencies on other plugins.

### Public functions
```
cloneLocale(source: Locale): Locale
setLocaleProperty(targetLocale: Locale, propName: string, newValue: any)
```

### Method signatures
For esday ('global')
```
// get / set name of global locale
esday.locale(): string
esday.locale(localeName: string): EsDay

// add a locale to the list of available locales
esday.registerLocale(locale: Locale, newName?: string): esday

// remove a locale to the list of available locales
esday.unregisterLocale(localeName: string): esday

// get object of existing locale
esday.getLocale: (localeName: string): Locale

// modify existing locale
esday.updateLocale: (localeName: string, newLocale: Partial<Locale>): esday
```

For EsDay instances ('local')
```
// get / set the locale of an esday instance
esday().locale(): string
esday().locale(localeName: string): EsDay

// get the locale object from the name of the locale
esday.localeObject(): Locale
```

| Parameter  | Type   | Description                |
| ---------- | ------ | ---------------------------|
| locale     | Locale | locale object to use       |
| localeName | string | name of the locale to use  |
| newName    | string | name to use for the locale |

## Locale object
Locales are defined in locale files that contain an object with all required Properties.

### Properties

Properties of the `Locale` object:

| Property      | Type     | Description                                                                                                                |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------|
| name          | string   | Name of the locale (e.g. `en-US`)                                                                                          |
| weekdays \| DayNamesStandaloneFormat | DayNames | Array of the full day names (e.g. `['Sunday', 'Monday', ... ]`)                                                            |
| weekdaysShort | DayNames | Array of the short day names (e.g. `['Sun', 'Mon', ... ]`)                                                                 |
| weekdaysMin   | DayNames | Array of the short day names (e.g. `['Su', 'Mo', ... ]`)                                                                   |
| months        | MonthNames \| MonthNamesStandaloneFormat \| MonthNamesFunction | Array of the full month names (e.g. `['January', 'February', ... ]`) |
| monthsShort   | MonthNames \| MonthNamesStandaloneFormat \| MonthNamesFunction | Array of the short month names (e.g. `['Jan', 'Feb', ... ]`)         |
| ordinal       | function | Get the ordinal form of a number (e.g. `ordinal(1) // returns '1st'`)                                                      |
| weekStart     | number   | Which is the 1st day of the week - 0=Sunday, 1=Monday etc. (e.g. `1` for Monday)                                           |
| yearStart     | number   | Which date **must** be part of the 1st week of the year (e.g. `4` for Jan 4th)                                             |
| formats       | object   | Localized format tokens for parsing and formatting (e.g. `LT` or `LL`)                                                     |
| calendar      | object   | Object containing the required format definitions                                                                          |
| relativeTime  | <Relative, string | RelativeTimeElementFunction>[] \| Replacement strings for relative time values (e.g. `future: 'in %s'`)           |
| meridiem      | function | Get meridiem string for a time value (e.g. `pm`)                                                                           |
| preParse      | function | Optional function that gets called before the input gets parsed                                                            |
| postFormat    | function | Optional function that gets called after the date got formatted                                                            |

All properties are readonly.

### Months / MonthsShort / Weekdays

`months`, `monthsShort` and `weekdays` can have several formats.
+ Array of strings
+ Object with properties 'format', 'standalone' and 'isFormat'. For `months` and `monthsShort` 'isFormat' is optional.
+ A function object with properties 'format' and 'standalone'. The signature of this function is `(esdayInstance: EsDay, format: string): string`.

The object and function variants are for cases, when more processing is required, to get the name of a month / weekday  (e.g., if the grammar is different for different formats).
+ `standalone` is the subjective form.
+ `format` is the nominative form.

`isFormat` is a regular expression that is used to check, whether a 'format' string conforms to the requirements to use the `format` list of names. The default value is `/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/`.

The function variant of `months` and `monthsShort` return the name of the month that matches the 'month' property of the given esdayInstance.

## Examples

```typescript
import { esday } from 'esday'
import localeZhCn from 'esday/locales/zh-cn'
import localePlugin from 'esday/plugins/locale'
import { cloneLocale, setLocaleProperty } from 'esday/plugins/locale'

esday.extend(localePlugin)
esday.registerLocale(localeZhCn)

esday.locale('zh-CN')
// set global locale to 'zh-CN'

esday.locale()
// returns  'zh-cn' (name of the global locale)

esday.getLocale('en')
// returns object for locale 'en'

const newMonths = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ] as const
esday.updateLocale('en', { months: newMonths })
// changes globally month names in locale 'en'

const mySpecialLocale = cloneLocale(esday.getLocale('en'))
setLocaleProperty(mySpecialLocale, 'name', 'en-MY')
setLocaleProperty(mySpecialLocale, 'months', newMonths)


const day = esday('2021-01-01').locale('en')
// set the locale of the esday object
```
