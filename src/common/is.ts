export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

export function undefinedOr<T, U>(v: T | undefined, or: U): T | U {
  return isUndefined(v) ? or : v
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

export function isEmptyObject(value: unknown): value is object {
  return isObject(value) && Object.keys(value).length === 0
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// biome-ignore lint/suspicious/noExplicitAny: "project won't build without any"
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function isValidDate(value: Date): boolean {
  return !Number.isNaN(value.valueOf())
}
