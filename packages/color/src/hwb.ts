import { clamp, flatten, isString, isUndefined } from './utils'
import {
  MAX_ALPHA,
  MAX_HUE,
  MAX_PERCENTAGE,
  MIN_ALPHA,
  MIN_HUE,
  MIN_PERCENTAGE
} from './constants'
import type { HSL } from './hsl'

export type HWB<
  Hue extends number,
  Whiteness extends number,
  Blackness extends number,
  Alpha extends number | void = void
> = [Hue, Whiteness, Blackness, Alpha]

const HWB_RE =
  /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/

export type GetHWB = {
  <C extends string>(color?: C): HSL<number, number, number, number> | undefined
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
    isUndefined(alpha) ? 1 : clamp(alpha, MIN_ALPHA, MAX_ALPHA)
  ]
}

export type ToHWB = {
  <N extends number>(hsl: HSL<N, N, N, N> | HWB<N, N, N>, alpha?: N): string
  <N extends number>(hsl: N[] | N[][], alpha?: N | N[]): string
  <N extends number>(...args: N[]): string
}

export const toHWB: ToHWB = (...hwb) => {
  const [hue, whiteness, blackness, alpha] = flatten(hwb).map((v, i) => {
    return i === 0
      ? clamp(v, MIN_HUE, MAX_HUE)
      : i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : clamp(v, MIN_PERCENTAGE, MAX_PERCENTAGE)
  })

  return isUndefined(alpha)
    ? `hwb(${hue}, ${whiteness}%, ${blackness}%)`
    : `hwb(${hue}, ${whiteness}%, ${blackness}%, ${alpha})`
}
