import { colors as base } from '@color-utils/colors'
import type { IColor } from './color'
import type { XYZ } from './xyz'
import type { LAB } from './lab'
import type { HWB } from './hwb'
import type { HSL } from './hsl'
import type { HEX } from './hex'
import type { CMYK } from './cmyk'
import type { RGB } from './rgb'
import type { NamedColor } from '@color-utils/colors'

export class Named extends Map<NamedColor, number> implements IColor {
  toNamed(): string {
    throw new Error('Method not implemented.')
  }

  static get colors(): Map<NamedColor, [number, number, number]> {
    const map = new Map<NamedColor, [number, number, number]>()

    for (const [name, color] of Object.entries(base)) {
      map.set(name as NamedColor, color as [number, number, number])
    }

    return map
  }

  toString(): string {
    throw new Error('Method not implemented.')
  }

  static closest(rgb: RGB): NamedColor {
    const [red, green, blue] = rgb.values()
    let currentDistance = Number.POSITIVE_INFINITY
    let closest = ''

    for (const [name, _rgb] of Named.colors) {
      const [_red, _green, _blue] = _rgb

      const distance = Math.sqrt(
        (red - _red) ** 2 + (green - _green) ** 2 + (blue - _blue) ** 2
      )

      if (distance < currentDistance) {
        currentDistance = distance
        closest = name
      }
    }

    return closest as NamedColor
  }

  toCMYK(): CMYK {
    throw new Error('Method not implemented.')
  }

  toHEX(): HEX {
    throw new Error('Method not implemented.')
  }

  toHSL(): HSL {
    throw new Error('Method not implemented.')
  }

  toHWB(): HWB {
    throw new Error('Method not implemented.')
  }

  toLAB(): LAB {
    throw new Error('Method not implemented.')
  }

  toRGB(): RGB {
    throw new Error('Method not implemented.')
  }

  toXYZ(): XYZ {
    throw new Error('Method not implemented.')
  }
}
