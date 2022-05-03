import { getHWB } from './hwb'
import { isString } from './utils'
import { getHSL } from './hsl'
import { getRGB } from './rgb'
import type { GetHWB } from './hwb'
import type { GetRGB } from './rgb'
import type { GetHSL } from './hsl'

export * from './rgb'
export * from './hsl'
export * from './hwb'
export * from './named'
export * from './hex'

// provide utils
export * from './utils'

export type GetColor = GetRGB | GetHSL | GetHWB

export const getColor: GetColor = (color) => {
  if (!color || !isString(color)) return undefined
  color = String(color).toLowerCase()

  const isHSL = color.startsWith('hsl')
  const isHWB = color.startsWith('hwb')

  if (isHSL) return getHSL(color)
  if (isHWB) return getHWB(color)
  return getRGB(color)
}
