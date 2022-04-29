export const isNumber = (v: unknown): v is number => typeof v === 'number'

export const clamp = <N>(
  n: N | number | string | undefined,
  min = 0,
  max = 0
) => {
  n = Number(n || 0)
  return n <= min ? min : n >= max ? max : n
}
