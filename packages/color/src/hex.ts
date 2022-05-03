import { flatten, isUndefined } from './utils'

// convert decimal to hex
const hexHex = (v: number | string): string => {
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

export type ToHex = {
  <N = number>(rgb: [N, N, N, N] | [N, N, N], alpha?: N): string
  <N = number>(rgb: N[] | N[][], alpha?: N | N[]): string
  <N = number>(...args: N[]): string
}

export const toHEX: ToHex = (...rgb) => {
  const [red, green, blue, alpha] = flatten(rgb).map(Number)

  return isUndefined(alpha)
    ? `#${hexHex(red)}${hexHex(green)}${hexHex(blue)}`
    : `#${hexHex(red)}${hexHex(green)}${hexHex(blue)}${
        alpha < 1 ? hexHex(alpha * 255) : ''
      }`
}
