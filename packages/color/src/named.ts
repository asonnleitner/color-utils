import { colors as c } from '@color-utils/colors'
import { clamp, flatten } from './utils'
import {
  MAX_ALPHA,
  MAX_COLOR_CHANNEL,
  MIN_ALPHA,
  MIN_COLOR_CHANNEL
} from './constants'
import { getRGB } from './rgb'
import type { NamedColor } from '@color-utils/colors'
import type { GetRGB } from './rgb'

const colors = new Map<string, NamedColor>()
Object.keys(c).map((key) =>
  colors.set((c as any)[key].join(','), key as NamedColor)
)

export type GetNamed = GetRGB

export const getNamed: GetNamed = getRGB

export type ToNamed = {
  <T extends number>(rgb: [T, T, T, T] | [T, T, T], alpha?: T): string
  <T extends number>(rgb: T[] | T[][], alpha?: T | T[]): string
  <T extends number>(...args: T[]): string
}

export const toNamed: ToNamed = (...rgb): any => {
  const [red, green, blue] = flatten(rgb).map((v, i) =>
    i === 3
      ? clamp(Number(v), MIN_ALPHA, MAX_ALPHA)
      : clamp(Number(v), MIN_COLOR_CHANNEL, MAX_COLOR_CHANNEL)
  )

  return colors.get(`${red},${green},${blue}`)
}
