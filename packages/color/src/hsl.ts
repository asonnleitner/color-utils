import { clamp, flatten, isString, isUndefined } from './utils'
import {
  MAX_ALPHA,
  MAX_HUE,
  MAX_PERCENTAGE,
  MIN_ALPHA,
  MIN_HUE,
  MIN_PERCENTAGE
} from './constants'

export type HSL<
  Hue extends number,
  Saturation extends number,
  Lightness extends number,
  Alpha extends number | void = void
> = [Hue, Saturation, Lightness, Alpha]

const HSL_RE =
  /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/

export function getHSL<C extends string>(
  color?: C
): HSL<number, number, number, number> | undefined
export function getHSL<C>(color?: C): any {
  if (!color || !isString(color)) return undefined

  const hsl = HSL_RE.exec(color) || []

  if (hsl.length === 0) return undefined

  const [, hue, saturation, lightness, alpha] = hsl

  return [
    ((Number(hue) % MAX_HUE) + MAX_HUE) % MAX_HUE,
    clamp(Number(saturation), MIN_PERCENTAGE, MAX_PERCENTAGE),
    clamp(Number(lightness), MIN_PERCENTAGE, MAX_PERCENTAGE),
    isUndefined(alpha) ? 1 : clamp(Number(alpha), MIN_ALPHA, MAX_ALPHA)
  ]
}

export function toHSL<T extends number>(
  hsl: HSL<T, T, T, T> | HSL<T, T, T>,
  alpha?: T
): string
export function toHSL<T extends number>(
  hsl: T[] | T[][],
  alpha?: T | T[]
): string
export function toHSL<T extends number>(...args: T[]): string
export function toHSL(...hsl: any): any {
  const [hue, saturation, lightness, alpha] = flatten(hsl).map((v, i) =>
    i === 0
      ? clamp(v, MIN_HUE, MAX_HUE)
      : i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : clamp(v, MIN_PERCENTAGE, MAX_PERCENTAGE)
  )

  return isUndefined(alpha)
    ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
    : `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}
