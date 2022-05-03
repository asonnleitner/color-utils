export type Nullable<T> = T | null | undefined

export type Many<T> = T | ReadonlyArray<T>

export const isArray = Array.isArray

type ToArray = {
  <T>(a?: Record<string | number, T>): Array<T>
  <T>(a?: Many<T>): Array<T>
  <T>(a?: T): Array<T[keyof T]>
}

export const toArray: ToArray = (a): any[] => {
  a = a || []
  return isArray(a) ? a : [a]
}

type Flatten = {
  <T>(a?: Nullable<ArrayLike<Many<T | Array<T>>>>): Array<T>
  <T>(a?: Nullable<Many<T | Array<T>>>): Array<T>
}

export const flatten: Flatten = (a) => toArray(a).flat(1)

export const flattenDeep: Flatten = (a) =>
  toArray(a).flat(Number.POSITIVE_INFINITY)
