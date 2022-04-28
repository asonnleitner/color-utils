import { colors } from '@color-utils/colors'
import { clamp, flattenArrayable, hasOwn, isString, isUndefined } from './utils'
import {
  MAX_ALPHA,
  MAX_COLOR_CHANNEL,
  MAX_PERCENTAGE,
  MIN_ALPHA,
  MIN_COLOR_CHANNEL
} from './constants'
import type { Transparent } from './types'
import type { NamedColor } from '@color-utils/colors'

export type RGB<
  Red extends number,
  Green extends number,
  Blue extends number,
  Alpha extends number | void = void
> = [Red, Green, Blue, Alpha]

const HEX_SHORT_RE = /^#([a-fA-F\d]{3,4})$/i
const HEX_RE = /^#([a-fA-F\d]{6})([a-fA-F\d]{2})?$/i

const RGBA_RE =
  /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/

const PERCENT_RE =
  /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/

const NAMED_RE = /^(\w+)$/

export function getRGB<C extends string | NamedColor | Transparent>(
  color?: C
): RGB<number, number, number, number> | undefined
export function getRGB<C>(color?: C): any {
  if (!color || !isString(color)) return undefined

  const base: number[] = []

  const isHex = HEX_RE.test(color)
  const isShortHex = HEX_SHORT_RE.test(color)
  const isRGBA = RGBA_RE.test(color)
  const isPercent = PERCENT_RE.test(color)
  const isNamed = NAMED_RE.test(color)

  if (isHex) {
    const [, hex, alpha] = HEX_RE.exec(color) || []

    const [, red, green, blue] =
      /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex) || []

    base.push(parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16))

    if (alpha) {
      base.push(
        // round to 2 decimal places
        Number((parseInt(alpha, 16) / MAX_COLOR_CHANNEL).toFixed(2))
      )
    }
  }

  if (isShortHex) {
    const [, hex, _, alpha] = HEX_SHORT_RE.exec(color) || []
    const [, red, green, blue] =
      /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i.exec(hex) || []

    base.push(
      parseInt(red + red, 16),
      parseInt(green + green, 16),
      parseInt(blue + blue, 16)
    )

    if (alpha) {
      base.push(parseInt(alpha + alpha, 16) / MAX_COLOR_CHANNEL)
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
    const [, red, green, blue, alpha, percent] = PERCENT_RE.exec(color) || []
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

    if (named === 'transparent') {
      return [0, 0, 0, 0]
    }

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

export function toRGB<T extends number>(
  rgb: RGB<T, T, T, T> | RGB<T, T, T>,
  alpha?: T
): string
export function toRGB<T extends number>(
  rgb: T[] | T[][],
  alpha?: T | T[]
): string
export function toRGB<T extends number>(...args: T[]): string
export function toRGB(...rgb: any): any {
  const [red, green, blue, alpha] = flattenArrayable(rgb).map((v, i) =>
    i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : clamp(v, MIN_COLOR_CHANNEL, MAX_COLOR_CHANNEL)
  )

  return isUndefined(alpha)
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function toRGBPercentage<T extends number>(
  rgb: RGB<T, T, T, T> | RGB<T, T, T>,
  alpha?: T
): string
export function toRGBPercentage<T extends number>(
  rgb: T[] | T[][],
  alpha?: T | T[]
): string
export function toRGBPercentage<T extends number>(...args: T[]): string
export function toRGBPercentage(...rgb: any[]): any {
  const [red, green, blue, alpha] = flattenArrayable(rgb).map((v, i) =>
    i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : Math.round((v / MAX_COLOR_CHANNEL) * MAX_PERCENTAGE)
  )

  return isUndefined(alpha)
    ? `rgb(${red}%, ${green}%, ${blue}%)`
    : `rgba(${red}%, ${green}%, ${blue}%, ${alpha})`
}
