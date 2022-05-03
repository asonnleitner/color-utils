import { colors } from '@color-utils/colors'
import { clamp, flatten, hasOwn, isString, isUndefined } from './utils'
import {
  MAX_ALPHA,
  MAX_COLOR_CHANNEL,
  MAX_PERCENTAGE,
  MIN_ALPHA,
  MIN_COLOR_CHANNEL
} from './constants'
import { fixHex } from './hex'
import type { NamedColor } from '@color-utils/colors'

const HEX_ALPHA_RE = /^#([a-f\d]{6})([a-f\d]{2})?$/i
const HEX_RE = /^#([a-f\d]{3,4})$|^#([a-f\d]{6})([a-f\d]{2})?$/i

const RGBA_RE =
  /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/

const RGB_PERCENT_RE =
  /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/

const NAMED_RE = /^(\w+)$/

export type GetRGB = {
  (color?: string): [number, number, number, number] | undefined
}

export const getRGB: GetRGB = (color): any => {
  if (!color || !isString(color)) return undefined

  const base = []

  const isHex = HEX_RE.test(color)
  const isRGBA = RGBA_RE.test(color)
  const isPercent = RGB_PERCENT_RE.test(color)
  const isNamed = NAMED_RE.test(color)

  if (isHex) {
    color = fixHex(color)
    const [, hex, alpha] = HEX_ALPHA_RE.exec(color) || []

    const [, red, green, blue] =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || []

    base.push(parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16))

    if (alpha) {
      base.push(
        // round to 2 decimal places
        Number((parseInt(alpha, 16) / MAX_COLOR_CHANNEL).toFixed(2))
      )
    }
  }

  if (isRGBA) {
    const [, red, green, blue, alpha, percent] = RGBA_RE.exec(color) || []
    base.push(Number(red), Number(green), Number(blue))

    if (alpha) {
      if (percent) {
        base.push(Number(alpha) / 100)
      } else {
        base.push(Number(alpha))
      }
    }
  }

  if (isPercent) {
    const [, red, green, blue, alpha, percent] =
      RGB_PERCENT_RE.exec(color) || []
    const roundChannel = (n: string) =>
      Math.round(Number(n) * (MAX_COLOR_CHANNEL / 100))

    base.push(roundChannel(red), roundChannel(green), roundChannel(blue))

    if (alpha) {
      if (percent) {
        base.push(Number(alpha) / 100)
      } else {
        base.push(Number(alpha))
      }
    }
  }

  if (isNamed) {
    const [, named] = NAMED_RE.exec(color) || []

    if (!hasOwn(colors, named)) return undefined

    base.push(...colors[named as NamedColor])
  }

  if (base.length === 3) base.push(1)

  return base.length === 0
    ? undefined
    : base.map((v, i) =>
        i === 3
          ? clamp(v, MIN_ALPHA, MAX_ALPHA)
          : clamp(v, MIN_COLOR_CHANNEL, MAX_COLOR_CHANNEL)
      )
}

export type ToRGB = {
  <N = number>(rgb: [N, N, N, N] | [N, N, N], alpha?: N): string
  <N = number>(rgb: N[] | N[][], alpha?: N | N[]): string
  <N = number>(...args: N[]): string
}

export const toRGB: ToRGB = (...rgb): any => {
  const [red, green, blue, alpha] = flatten(rgb).map((v, i) =>
    i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : clamp(v, MIN_COLOR_CHANNEL, MAX_COLOR_CHANNEL)
  )

  return isUndefined(alpha)
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export type ToRGBPercent = ToRGB

export const toRGBPercentage: ToRGBPercent = (...rgb) => {
  const [red, green, blue, alpha] = flatten(rgb).map((v, i) =>
    i === 3
      ? clamp(Number(v), MIN_ALPHA, MAX_ALPHA)
      : Math.round((Number(v) / MAX_COLOR_CHANNEL) * MAX_PERCENTAGE)
  )

  return isUndefined(alpha)
    ? `rgb(${red}%, ${green}%, ${blue}%)`
    : `rgba(${red}%, ${green}%, ${blue}%, ${alpha})`
}
