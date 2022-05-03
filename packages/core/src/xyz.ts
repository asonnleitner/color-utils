import type { IColor } from './color'
import type { RGB } from './rgb'
import type { LAB } from './lab'
import type { HWB } from './hwb'
import type { HSL } from './hsl'
import type { HEX } from './hex'
import type { CMYK } from './cmyk'

type XYZKeys = 'x' | 'y' | 'z'

export class XYZ extends Map<XYZKeys, number> implements IColor {
  constructor(x = 0, y = 0, z = 0) {
    super()
    this.set('x', x)
    this.set('y', y)
    this.set('z', z)
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
    throw new Error('Method not implemented.')
  }

  toNamed(): string {
    throw new Error('Method not implemented.')
  }
}
