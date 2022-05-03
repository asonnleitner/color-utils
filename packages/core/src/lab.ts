import { setPercentage } from './utils'
import { Color } from './color'
import { XYZ } from './xyz'
import type { IColor } from './color'
import type { RGB } from './rgb'
import type { HWB } from './hwb'
import type { HSL } from './hsl'
import type { HEX } from './hex'
import type { CMYK } from './cmyk'

export type LABKeys = 'lightness' | 'a' | 'b'

export class LAB extends Map<LABKeys, number> implements IColor {
  constructor(lightness = 0, a = 0, b = 0) {
    super()
    setPercentage(this, 'lightness', lightness)
    this.set('a', a)
    this.set('b', b)
  }

  toString(): string {
    throw new Error('Method not implemented.')
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
    const [lightness, a, b] = this.values()

    const fY = (lightness + 16) / 116
    const fZ = fY - b / 200
    const fX = a / 500 + fY

    const xR =
      fX ** 3 > Color.D65_EPSILON ? fX ** 3 : (116 * fX - 16) / Color.D65_KAPPA

    const yR =
      lightness > Color.D65_KAPPA * Color.D65_EPSILON
        ? (lightness + 16 / 116) ** 3
        : lightness / Color.D65_KAPPA

    const zR =
      fZ ** 3 > Color.D65_EPSILON ? fZ ** 3 : (116 * fZ - 16) / Color.D65_KAPPA

    const [x, y, z] = Color.D65_ILLUMINANT_XYZ

    return new XYZ(xR * x, yR * y, zR * z)
  }

  toNamed(): string {
    throw new Error('Method not implemented.')
  }
}
