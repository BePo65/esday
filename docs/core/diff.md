# Difference

The `diff` method calculates the difference between two esday objects using the specified unit.

The default unit is milliseconds.

To get the difference in another unit of measurement, pass that measurement as the second argument.

By default `diff` will truncate the result to an integer. If you want a floating point number, pass true as the third argument.

## Usage

### Method signatures
```signature
esday().diff(date: EsDay, unit?: UnitTypeAddSub, asFloat?: boolean): number
```

| parameter | description                                         |
| --------- | --------------------------------------------------- |
| date      | EsDay object to calculate the difference to         |
| unit      | Unit to use for the calculated difference           |
| asFloat   | return the result as float  (false= return integer) |

### Available Units in UnitTypeAddSub

Short form: 'y', 'Q', 'M', 'w', 'd', 'D', 'h', 'm', 's' and 'ms'.
Long form: 'year', 'quarter', 'month', 'week', 'day', 'date', 'hour', 'minute', 'second' and 'millisecond'.
Plural form: 'years', 'quarters', 'months', 'weeks', 'days', 'dates', 'hours', 'minutes', 'seconds' and 'milliseconds'.

Both `days` and `dates` (in short, long and plural forms) mean 'days'.

## Examples
```typescript
import { esday } from 'esday'

// calculating difference with default unit ('milliseconds')
esday('2019-01-25').diff(esday('2018-06-05'))
// Returns 20214000000

// calculating difference with unit 'months'
esday('2019-01-25').diff(esday('2018-06-05'), 'month')
// Returns 7

// calculating difference with unit 'months' as float
esday('2019-01-25').diff(esday('2018-06-05'), 'M', true)
// Returns 7.645161290322581
```
