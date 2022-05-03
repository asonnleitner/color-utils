export const clamp = <T extends number>(n: T, min: number, max: number) =>
  n <= min ? min : n >= max ? max : n

export const setColorChannel = <K extends string>(
  context: Map<K, number>,
  key: K,
  value: number
) => context.set(key, Math.round(clamp(value, 0, 255)))

export const setPercentage = <K extends string>(
  context: Map<K, number>,
  key: K,
  value: number
) => context.set(key, Math.round(clamp(value, 0, 100)))

export const setHue = <K extends string = 'hue'>(
  context: Map<K, number>,
  value: number
) => context.set('hue' as K, Math.round(clamp(value, 0, 360)))

export const setAlpha = <K extends string = 'alpha'>(
  context: Map<K, number>,
  value: number
) => context.set('alpha' as K, clamp(value, 0, 1))

export const divideBy = (by: number) => (v: number) => v / by

export const multiplyBy = (by: number) => (v: number) => v * by

export const hueToRGB = (p: number, q: number, tint: number) => {
  if (tint < 0) tint += 1
  if (tint > 1) tint -= 1
  if (tint < 1 / 6) return p + (q - p) * 6 * tint
  if (tint < 1 / 2) return q
  if (tint < 2 / 3) return p + (q - p) * (2 / 3 - tint) * 6
  return p
}

export const floor = (v: number) =>
  v >= 0 && v < 0x80000000
    ? v & 0xffffffff
    : v > -0x80000000 && v < 0
    ? (v - 1) & 0xffffffff
    : Math.floor(v)

export const trunc = (v: number) =>
  v > -0x80000000 && v < 0x80000000 ? v & 0xffffffff : Math.trunc(v)
