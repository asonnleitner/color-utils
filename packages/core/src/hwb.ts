import { multiplyBy, setAlpha, setHue, setPercentage, trunc } from './utils'
import { Color } from './color'
import { RGB } from './rgb'
import type { IColor } from './color'
import type { HSL } from './hsl'
import type { LAB } from './lab'
import type { XYZ } from './xyz'
import type { HEX } from './hex'
import type { CMYK } from './cmyk'

export type HWBKeys = 'hue' | 'white' | 'black' | 'alpha'

export class HWB extends Map<HWBKeys, number> implements IColor {
  constructor(hue = 0, white = 0, black = 0, alpha = 1) {
    super()
    setHue(this, hue)
    setPercentage(this, 'white', white)
    setPercentage(this, 'black', black)
    setAlpha(this, alpha)
  }

  toString(): string {
    const [hue, white, black, alpha] = this.values()
    if (alpha === 1) {
      return `hwb(${hue}, ${white}%, ${black}%)`
    } else {
      return `hwb(${hue}, ${white}%, ${black}%, ${alpha})`
    }
  }

  toCMYK(): CMYK {
    return this.toRGB().toCMYK()
  }

  toHEX(): HEX {
    return this.toRGB().toHEX()
  }

  toHSL(): HSL {
    return this.toRGB().toHSL()
  }

  toHWB(): HWB {
    return this
  }

  toLAB(): LAB {
    return this.toRGB().toLAB()
  }

  toRGB(): RGB {
    let [h, w, b, alpha] = this.values()
    h /= 360
    w /= Color.MAX_PERCENT
    b /= Color.MAX_PERCENT

    const ratio = w + b
    if (ratio > 1) {
      w /= ratio
      b /= ratio
    }

    const i = trunc(h * 6)
    const v = 1 - b
    const f = i & 1 ? 1 - (6 * h - i) : 6 * h - i
    // interpolation between w and v
    const n = w + f * (v - w)

    return new RGB(
      ...(i === 0 || i === 6
        ? [v, n, w]
        : i === 1
        ? [n, v, w]
        : i === 2
        ? [w, v, n]
        : i === 3
        ? [w, n, v]
        : i === 4
        ? [n, w, v]
        : [v, w, n]
      ).map(multiplyBy(Color.MAX_RGB)),
      alpha
    )
  }

  toXYZ(): XYZ {
    return this.toRGB().toXYZ()
  }

  toNamed(): string {
    return this.toRGB().toNamed()
  }
}
