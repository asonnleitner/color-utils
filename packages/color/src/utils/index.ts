export * from './array'
export * from './math'
export * from './object'
export * from './string'

export const isUndefined = (v: unknown): v is undefined =>
  typeof v === 'undefined'
