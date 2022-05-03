import { Color } from './color'
import type { IColor } from './color'
import type { LAB } from './lab'
import type { RGB } from './rgb'
import type { CMYK } from './cmyk'
import type { HSL } from './hsl'
import type { HWB } from './hwb'
import type { Named } from './named'
import type { XYZ } from './xyz'

export class HEX extends Map<'hex', string> implements IColor {
  toRGB(): RGB {
    throw new Error('Method not implemented.')
  }
  toHSL(): HSL {
    throw new Error('Method not implemented.')
  }
  toHWB(): HWB {
    throw new Error('Method not implemented.')
  }
  toCMYK(): CMYK {
    throw new Error('Method not implemented.')
  }
  toXYZ(): XYZ {
    throw new Error('Method not implemented.')
  }
  toLAB(): LAB {
    throw new Error('Method not implemented.')
  }
  constructor(color?: RGB | CMYK | HEX | HSL | HWB | LAB | Named | XYZ) {
    super()

    if (Color.isRGB(color)) {
      this.set('hex', HEX.fromRGB(color))
    }
  }

  toString(): string {
    throw new Error('Method not implemented.')
  }

  static fromRGB(rgb: RGB): string {
    const [red, green, blue, alpha] = rgb.values()
    const hex = (red << 16) + (green << 8) + blue

    let str = hex.toString(16)

    // pad with zeros
    str.length < 6 && (str = '0'.repeat(6 - str.length) + str)

    if (alpha !== 1) {
      str = `${str}${Math.round(alpha * 255)
        .toString(16)
        .padStart(2, '0')}`
    }

    return `#${str}`
  }

  toHEX(): HEX {
    return this
  }

  toNamed(): string {
    throw new Error('Method not implemented.')
  }
}
