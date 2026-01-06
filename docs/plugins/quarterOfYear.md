# QuarterOfYear

QuarterOfYear adds the `quarter` method to EsDay and extend the `get` and `set` methods to get or set the quarter of year of a date.
Setting the quarter does not affect the time of an EsDay instance.

QuarterOfYear adds support for the formatting Token `Q`.

### Method signatures
```signature
esday().quarter(): number
esday().quarter(quarterNumber: number): EsDay
```

| parameter     | description              |
| ------------- | ------------------------ |
| quarterNumber | date string to be parsed |

### Added units
| **Unit**   | **Example** | **Description**  |
| ---------- | ----------- | ---------------- |
| 'Q'        | 1-4         | Quarter of year. |
| 'quarter'  | 1-4         | Quarter of year. |
| 'quarters' | 1-4         | Quarter of year. |

### Added formatting tokens
| **Token** | **Example** | **Description**                                        |
| --------- | ----------- | ---------------- |
| Q         | 1-4         | Quarter of year. |

## Examples
```typescript
import { esday } from 'esday'
import quarterOfYearPlugin from 'esday/plugins/quarterOfYear'

esday.extend(quarterOfYearPlugin)

esday('2023-08-14T21:43:12.123').get('Q')
// Returns 3

esday('2023-08-14T21:43:12.123').quarter()
// Returns 3

esday('2023-08-14T21:43:12.123').set('quarter', 1)
// Returns '2023-01-01T21:43:12.123' as EsDay

esday('2023-08-14T21:43:12.123').quarter(1)
// Returns '2023-01-01T21:43:12.123' as EsDay
```

### Formatting date using token 'Q'
```typescript
esday('2023-08-14T21:43:12.123').format('YYYY Q')
// Returns '2023 3'
```
