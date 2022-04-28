export const toString = (v: unknown) => Object.prototype.toString.call(v)

export const isString = (v: unknown): v is string => typeof v === 'string'
