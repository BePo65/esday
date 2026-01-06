# Parsing

The `esday()` method returns an `esday` object defined by the method parameter.

## Usage

### Method signatures
```signature
esday(): EsDay
esday(dateString: string): EsDay
esday(dateObject: Date): EsDay
esday(timestamp: number): EsDay
esday(esdayObject: EsDay): EsDay
esday(dateArray: number[]): EsDay
```

| parameter   | description                                      |
| ----------- | ------------------------------------------------ |
| dateString  | ISO8601 date string (with date, time and offset) |
| dateString  | RFC2822 date string (with date, time and offset) |
| dateObject  | javascript Date object                           |
| timestamp   | unix timestamp (as seconds or milliseconds)      |
| esdayObject | EsDay object                                     |
| dateArray   | array with date elements (year, month, etc. )    |

More signature types are available, when using a plugin (like [AdvancedParse](../plugins/advancedParse.md) or [LocalizedParse](../plugins/localizedParse.md)).

## Examples
```typescript
import { esday } from 'esday'

esday()
// Returns an instance of EsDay for the current date/time

esday({})
// Returns an instance of EsDay for the current date/time

esday([])
// Returns an instance of EsDay for the current date/time

esday('2024-04-24T16:27:38.456Z')
// Returns an instance of EsDay for '2024-04-24T16:27:38.456Z'

esday('Sun, 11 Feb 2024 09:46:50 GMT+1')
// Returns an instance of EsDay for '2024-02-11T09:46:50+01:00'

esday(1722173696234)
// Returns an instance of EsDay for '2024-07-28T13:34:56.234Z'

esday(1722173696)
// Returns an instance of EsDay for '2024-07-28T13:34:56.000Z'

esday(new Date('2024-04-24T16:27:38.456Z'))
// Returns an instance of EsDay for '2024-04-24T16:27:38.456Z'

esday([2024, 5, 1, 13, 14, 15, 99])
// Returns an instance of EsDay for '2024-06-01T13:14:15.099'

esday([2024, 5, 1])
// Returns an instance of EsDay for '2024-06-01T00:00:00.000'
```

Parameters that return invalid dates (`esday(invalidParameter).valid() === false`)
```typescript
esday(null)
esday(Number.NaN)
esday(Number.POSITIVE_INFINITY)
esday('not-a-date-string')
```
