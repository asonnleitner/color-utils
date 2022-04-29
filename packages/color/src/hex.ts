import { flatten, isUndefined } from './utils'
import type { RGB } from './rgb'

// convert decimal to hex
const hexHex = <T extends number | string>(v: T): string => {
  const hex = Math.round(Number(v)).toString(16).toUpperCase()
  return hex.length === 1 ? `0${hex}` : hex
}

export const fixHex = (hex: string | number) => {
  hex = String(hex).startsWith('#') ? String(hex).slice(1) : String(hex)

  // adjust length
  if (hex.length === 5 || hex.length === 7) {
    hex = hex.slice(0, hex.length - 1)
  }

  // store length
  const length = hex.length

  // apply correction
  if (length === 3 || length === 4) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  // return hex
  return `#${hex}`.toUpperCase()
}

export function toHEX<T extends number>(
  rgb: RGB<T, T, T, T> | RGB<T, T, T>,
  alpha?: T
): string
export function toHEX<T extends number>(
  rgb: T[] | T[][],
  alpha?: T | T[]
): string
export function toHEX<T extends number>(...args: T[]): string
export function toHEX(...rgb: any): any {
  const [red, green, blue, alpha] = flatten(rgb)

  return isUndefined(alpha)
    ? `#${hexHex(red)}${hexHex(green)}${hexHex(blue)}`
    : `#${hexHex(red)}${hexHex(green)}${hexHex(blue)}${
        alpha < 1 ? hexHex(alpha * 255) : ''
      }`
}
