import { clamp, flattenArrayable, isString, isUndefined } from './utils'
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

export function getHWB<C extends string>(
  color?: C
): HSL<number, number, number, number> | undefined
export function getHWB<C>(color?: C): any {
  if (!color || !isString(color)) return undefined

  const hwb = HWB_RE.exec(color) || []

  if (hwb.length === 0) return undefined

  const [, hue, whiteness, blackness, alpha] = hwb
  return [
    ((Number(hue) % MAX_HUE) + MAX_HUE) % MAX_HUE,
    clamp(Number(whiteness), MIN_PERCENTAGE, MAX_PERCENTAGE),
    clamp(Number(blackness), MIN_PERCENTAGE, MAX_PERCENTAGE),
    isUndefined(alpha) ? 1 : clamp(Number(alpha), MIN_ALPHA, MAX_ALPHA)
  ]
}

export function toHWB<T extends number>(
  hsl: HSL<T, T, T, T> | HWB<T, T, T>,
  alpha?: T
): string
export function toHWB<T extends number>(
  hsl: T[] | T[][],
  alpha?: T | T[]
): string
export function toHWB<T extends number>(...args: T[]): string
export function toHWB(...hwb: any): any {
  const [hue, whiteness, blackness, alpha] = flattenArrayable(hwb).map(
    (v, i) => {
      return i === 0
        ? clamp(v, MIN_HUE, MAX_HUE)
        : i === 3
        ? clamp(v, MIN_ALPHA, MAX_ALPHA)
        : clamp(v, MIN_PERCENTAGE, MAX_PERCENTAGE)
    }
  )

  return isUndefined(alpha)
    ? `hwb(${hue}, ${whiteness}%, ${blackness}%)`
    : `hwb(${hue}, ${whiteness}%, ${blackness}%, ${alpha})`
}
