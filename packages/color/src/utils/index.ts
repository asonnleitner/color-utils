export * from './array'
export * from './math'
export * from './object'
export * from './string'

export const isUndefined = (v: unknown): v is undefined =>
  typeof v === 'undefined'

export const isNull = (v: unknown): v is null => v === null

export const isNil = <T>(v: T | null | undefined): v is null | undefined =>
  isNull(v) || isUndefined(v)
