import { getHWB } from './hwb'
import { isString } from './utils'
import { getHSL } from './hsl'
import { getRGB } from './rgb'
import type { NamedColor } from '@color-utils/colors'
import type { RGB } from './rgb'
import type { HSL } from './hsl'

export * from './rgb'
export * from './hsl'
export * from './hwb'
export * from './named'
export * from './hex'

// provide utils
export * from './utils'

export function getColor<C extends string | NamedColor>(
  color?: C
): RGB<number, number, number, number> | undefined
export function getColor<C extends string>(
  color?: C
): HSL<number, number, number, number> | undefined
export function getColor<C extends string>(
  color?: C
): HSL<number, number, number, number> | undefined
export function getColor(color?: any): any {
  if (!color || !isString(color)) return undefined
  color = String(color).toLowerCase()

  const isHSL = color.startsWith('hsl')
  const isHWB = color.startsWith('hwb')

  if (isHSL) return getHSL(color)
  if (isHWB) return getHWB(color)
  return getRGB(color)
}
