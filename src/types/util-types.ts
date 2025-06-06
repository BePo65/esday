// From https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript
export type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : Tuple<T, N, [T, ...R]>

export type SimpleType = string | number | boolean | null | undefined

// Type for e.g. calling parameters of EsDayFactory function
export type SimpleObject = Record<string, SimpleType | string[] | Record<string, SimpleType>>
