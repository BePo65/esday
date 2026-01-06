# DayOfYear

DayOfYear adds the `dayOfYear` getter and setter to EsDay to get or set the day of the year of a date. DayOfYear accepts numbers from 1 to 366. If the range is exceeded, it will bubble up to the following year.

## Usage

### Dependencies
DayOfYear has no dependencies on other plugins.

### Method signatures
```signature
esday().dayOfYear(): number
esday().dayOfYear(dayOfYear: number): EsDay
```

## Examples
```typescript
import { esday } from 'esday'
import dayOfYearPlugin from 'esday/plugins/weekOfYear'

esday.extend(dayOfYearPlugin)

esday('2020-03-01').dayOfYear()
// Returns 61

esday('2020-01-01').dayOfYear(100)
// Returns esday for '2020-04-09'
```
