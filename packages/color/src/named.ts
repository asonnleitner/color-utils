import { colors as c } from '@color-utils/colors'
import { clamp, flattenArrayable } from './utils'
import {
  MAX_ALPHA,
  MAX_COLOR_CHANNEL,
  MIN_ALPHA,
  MIN_COLOR_CHANNEL
} from './constants'
import { getRGB } from './rgb'
import type { NamedColor } from '@color-utils/colors'
import type { RGB } from './rgb'

const colors = new Map<string, NamedColor>()
Object.keys(c).map((key) =>
  colors.set((c as any)[key].join(','), key as NamedColor)
)

export const getNamed = getRGB

export function toNamed<T extends number>(
  rgb: RGB<T, T, T, T> | RGB<T, T, T>,
  alpha?: T
): string
export function toNamed<T extends number>(
  rgb: T[] | T[][],
  alpha?: T | T[]
): string
export function toNamed<T extends number>(...args: T[]): string
export function toNamed(...rgb: any): any {
  const [red, green, blue] = flattenArrayable(rgb).map((v, i) =>
    i === 3
      ? clamp(v, MIN_ALPHA, MAX_ALPHA)
      : clamp(v, MIN_COLOR_CHANNEL, MAX_COLOR_CHANNEL)
  )

  return colors.get(`${red},${green},${blue}`)
}
