import { clamp, flatten, isString, isUndefined } from './utils'
import { MAX_HUE, MAX_PERCENTAGE, MIN_HUE, MIN_PERCENTAGE } from './constants'

const HWB_RE =
  /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/

export type GetHWB = {
  (color?: string): [number, number, number, number] | undefined
}

export const getHWB: GetHWB = (color) => {
  if (!color || !isString(color)) return undefined

  const hwb = HWB_RE.exec(color) || []

  if (hwb.length === 0) return undefined

  const [, hue, whiteness, blackness, alpha] = hwb
  return [
    ((Number(hue) % MAX_HUE) + MAX_HUE) % MAX_HUE,
    clamp(whiteness, MIN_PERCENTAGE, MAX_PERCENTAGE),
    clamp(blackness, MIN_PERCENTAGE, MAX_PERCENTAGE),
    isUndefined(alpha) ? 1 : clamp(alpha)
  ]
}

export type ToHWB = {
  <N = number>(hsl: [N, N, N, N] | [N, N, N], alpha?: N): string
  <N = number>(hsl: N[] | N[][], alpha?: N | N[]): string
  <N = number>(...args: N[]): string
}

export const toHWB: ToHWB = (...hwb) => {
  const [hue, whiteness, blackness, alpha] = flatten(hwb).map((v, i) => {
    return i === 0
      ? clamp(v, MIN_HUE, MAX_HUE)
      : i === 3
      ? clamp(v)
      : clamp(v, MIN_PERCENTAGE, MAX_PERCENTAGE)
  })

  return isUndefined(alpha)
    ? `hwb(${hue}, ${whiteness}%, ${blackness}%)`
    : `hwb(${hue}, ${whiteness}%, ${blackness}%, ${alpha})`
}
