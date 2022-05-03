import { clamp, flatten, isString, isUndefined } from './utils'
import {
  MAX_ALPHA,
  MAX_HUE,
  MAX_PERCENTAGE,
  MIN_ALPHA,
  MIN_HUE,
  MIN_PERCENTAGE
} from './constants'

const HSL_RE =
  /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/

export type GetHSL = {
  (color?: string): [number, number, number, number] | undefined
}

export const getHSL: GetHSL = (color) => {
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

export type ToHSL = {
  <N = number>(hsl: [N, N, N, N] | [N, N, N], alpha?: N): string
  <N = number>(hsl: N[] | N[][], alpha?: N | N[]): string
  <N = number>(...args: N[]): string
}

export const toHSL: ToHSL = (...hsl) => {
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
