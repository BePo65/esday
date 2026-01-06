# Formatting

The `format()` method returns a string representing an `esday` object.

## Usage

### Method signatures
#### Formatting using a given format template
```signature
esday().format(formatTemplate: string): string
```

| parameter      | description                                   |
| -------------- | --------------------------------------------- |
| formatTemplate | template used for formatting the EsDay object |

#### Adding new formatting tokens
```signature
esday.addTokenDefinitions(newTokens: TokenDefinitions)
```

**Format of TokenDefinitions**
```typescript
type TokenDefinitions = Record<token, [regexDefaultMode, regexStrictMode, setterFn]>
```

| parameter          | type     | description                                      |
| ------------------ | -------- | ------------------------------------------------ |
| token              | string   | token to be parsed (e.g. 'Q')                    |
| regexDefaultMode   | RegExp   | regex used for parsing in default mode           |
| regexStrictMode    | RegExp   | regex used for parsing in strict mode            |
| setterFn           | function | function to add parsed value to result in 'this' |

Signature of `setterFn`
```signature
(this: ParsedElements, input: string) => void
```

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

## Parsing tokens
| **Token** | **Example**                       | **Description**                                            |
| --------- | --------------------------------- | ---------------------------------------------------------- |
| YY        | 1                                 | Two-digit year                                             |
| YYYY      | 2001                              | Four-digit year                                            |
| M         | 1-12                              | Month, beginning at 1                                      |
| MM        | 01-12                             | Month, 2-digits                                            |
| D         | 1-31                              | Day of month                                               |
| DD        | 01-31                             | Day of month, 2-digits                                     |
| H         | 0-23                              | Hours                                                      |
| HH        | 00-23                             | Hours, 2-digits                                            |
| m         | 0-59                              | Minutes                                                    |
| mm        | 00-59                             | Minutes, 2-digits                                          |
| s         | 0-59                              | Seconds                                                    |
| ss        | 00-59                             | Seconds, 2-digits                                          |
| SSS       | 000-999                           | Milliseconds, 3-digits                                     |
| Z         | +05:00:00                         | Offset from UTC                                            |

To use one of the supported tokens as test between the date elements, these characters must be escaped (i.e.wrapped in square brackets).
An example for a formatting string with escaped test is `YYY-MM-DD [MM] HH [any other text] mm [m]b`.

## Examples
### Formatting
```typescript
import { esday } from 'esday'

esday('08-2023-14 21:43:12.123').format('MM-YYYY-DD HH:mm:ss.SSS')
// Returns '2023-08-14T21:43:12.123'
```

### Adding new formatting tokens
This functionality is above all for plugin developers
```typescript
const additionalTokens: TokenDefinitions = {
  PP: [/\d\d?/, /\d{2}/, function (input) {
    // in this example we don't use the parsed value ('input')
    this.milliseconds = 987
  }],
}
esday.addTokenDefinitions(additionalTokens)

esday('2024 3').format('YYYY PP')
// Returns '2023-08-14T21:43:12.123'
```
