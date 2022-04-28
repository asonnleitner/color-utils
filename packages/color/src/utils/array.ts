export type Nullable<T> = T | null | undefined

export type Arrayable<T> = T | Array<T>

export const isArray = Array.isArray

export const toArray = <T>(a?: Nullable<Arrayable<T>>): Array<T> => {
  a = a || []
  return isArray(a) ? a : [a]
}

export const flattenArrayable = <T>(
  a?: Nullable<Arrayable<T | Array<T>>>
): Array<T> => toArray(a).flat(1) as Array<T>

export const mergeArrayable = <T>(...a: Nullable<Arrayable<T>>[]): Array<T> =>
  a.flatMap((i) => toArray(i))
