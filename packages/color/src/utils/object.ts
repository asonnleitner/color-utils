const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = <T extends object>(
  o: T,
  k: PropertyKey
): k is keyof typeof o => hasOwnProperty.call(o, k)
