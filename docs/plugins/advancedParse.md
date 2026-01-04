# AdvancedParse

AdvancedParse extends the `esday` constructor to support custom formats of input strings.

## Usage

### Dependencies
AdvancedParse requires no other plugin.

AdvancedParse can be used together with the plugin Utc. If used together with the plugin Utc, the plugin Utc must be activated using esday.extend(...) before the plugin AdvancedParse.

If used together with the plugin Locale and/or LocalizedParse, then AdvancedParse must be activated before these plugins, as AdvancedParse "terminates" the parsing chain, if we have a parsing format.

### Method signatures
```typescript
esday(date: string, format: string): EsDay
esday(date: string, format: string[]): EsDay
esday(date: string, format: string, strict: boolean): EsDay
esday(date: string, format: string[], strict: boolean): EsDay
```
and for the `utc` plugin
```typescript
esday.utc(date: string, format: string): EsDay
esday.utc(date: string, format: string[]): EsDay
esday.utc(date: string, format: string, strict: boolean): EsDay
esday.utc(date: string, format: string[], strict: boolean): EsDay
```

| parameter | description                              |
| --------- | ---------------------------------------- |
| date      | date string to be parsed                 |
| format    | format string(s) used for parsing `date` |
| strict    | date string must match format exactly    |

If an array of formats is used, `date` will be parsed with the best matching format in this array.

### Parsing tokens
| **Token** | **Example**   | **Description**                                                      |
| --------- | ------------- | -------------------------------------------------------------------- |
| Y         | -25           | Year with any number of digits and sign                              |
| YY        | 14            | Two-digit year                                                       |
| YYYY      | 2001          | 4 or 2 digit year. Note: Only 4 digit can be parsed in 'strict' mode |
| Q         | 1-4           | Quarter of year. Sets month to first month in quarter.               |
| M         | 1..12         | Month, beginning at 1                                                |
| MM        | 01..12        | Month, 2-digits                                                      |
| D         | 1..31         | Day of month                                                         |
| DD        | 01..31        | Day of month, 2-digits                                               |
| H         | 0..23         | Hours (24 hour time)                                                 |
| HH        | 00..23        | Hours (24 hour time),2-digits                                        |
| m         | 0..59         | Minutes                                                              |
| mm        | 00..59        | Minutes, 2-digits                                                    |
| s         | 0..59         | Seconds                                                              |
| ss        | 00..59        | Seconds, 2-digits                                                    |
| S         | 0..9          | Hundreds of milliseconds, 1-digit (000 .. 900)                       |
| SS        | 00..99        | Tens of milliseconds, 2-digits (000 .. 990                           |
| SSS       | 000..999      | Milliseconds, 3-digits                                               |
| Z         | +05:00        | Offset from UTC as `+-HH:mm`, `+-HHmm`, or `Z`                       |
| ZZ        | \-0500        | Compact offset from UTC, 2-digits  as `+-HH:mm`, `+-HHmm`, or `Z`    |
| X         | 1410715640579 | Unix timestamp                                                       |
| x         | 1410715640579 | Unix ms timestamp                                                    |

### Adding new parsing tokens
```typescript
esday.addTokenDefinitions(newTokens: TokenDefinitions)
```

**Format of TokenDefinitions**
```typescript
type TokenDefinitions = Record<string, [RegExp, RegExp, (this: ParsedElements, input: string) => void]>
```

| parameter          | type     | description                                      |
| ------------------ | -------- | ------------------------------------------------ |
| token              | string   | token to be parsed (e.g. 'Q')                    |
| regex default mode | RegExp   | regex used for parsing in default mode           |
| regex strict mode  | RegExp   | regex used for parsing in strict mode            |
| setter             | function | function to add parsed value to result in 'this' |

**Parameters of setter**
| parameter | type           | description                   |
| --------- | -------------- | ----------------------------- |
| this      | ParsedElements | object for results of parsing |
| input     | string         | parsed value                  |

**Format of ParsedElements**
```typescript
interface ParsedElements {
  year?: number
  month?: number
  day?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  zoneOffset?: number
  unix?: number
}
```

## Examples
### Parsing
```typescript
import { esday } from 'esday'
import advancedParsePlugin from 'esday/plugins/advancedParse'
import utcPlugin from 'esday/plugins/utc'

esday.extend(utcPlugin)
esday.extend(advancedParsePlugin)

esday('08-2023-14 21:43:12.123', 'MM-YYYY-DD HH:mm:ss.SSS')
// Returns an instance containing '2023-08-14T21:43:12.123' in local timezone

esday('08/2023/14 21 43.12 123', 'MM/YYYY/DD HH mm.ss SSS', true)
// In strict mode the format must match the parsed date (even the separators)

esday.utc('08-2023-14 21:43:12.123', 'MM-YYYY-DD HH:mm:ss.SSS')
// Returns an instance containing '2023-08-14T21:43:12.123' in utc
```

### Adding new parsing tokens
This functionality is above all for plugin developers
```typescript
const additionalTokens: TokenDefinitions = {
  PP: [/\d\d?/, /\d{2}/, function (input) {
    // in this example we don't use the parsed value ('input')
    this.milliseconds = 987
  }],
}
esday.addTokenDefinitions(additionalTokens)

const parsedDate = esday('2024 3', 'YYYY PP')
```
