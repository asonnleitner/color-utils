import { setAlpha, setHue, setPercentage } from './utils'
import { Color } from './color'
import { RGB } from './rgb'
import type { HWB } from './hwb'
import type { IColor } from './color'
import type { CMYK } from './cmyk'
import type { HEX } from './hex'
import type { LAB } from './lab'
import type { XYZ } from './xyz'

export type HSLKeys = 'hue' | 'saturation' | 'lightness' | 'alpha'

export class HSL extends Map<HSLKeys, number> implements IColor {
  constructor(hue = 0, saturation = 0, lightness = 0, alpha = 1) {
    super()
    setHue(this, hue)
    setPercentage(this, 'saturation', saturation)
    setPercentage(this, 'lightness', lightness)
    setAlpha(this, alpha)
  }

  toNamed(): string {
    return this.toRGB().toNamed()
  }

  toHSL(): HSL {
    return this
  }

  toHWB(): HWB {
    return this.toRGB().toHWB()
  }

  toHEX(): HEX {
    return this.toRGB().toHEX()
  }

  toCMYK(): CMYK {
    return this.toRGB().toCMYK()
  }

  toXYZ(): XYZ {
    return this.toRGB().toXYZ()
  }

  toLAB(): LAB {
    return this.toRGB().toLAB()
  }

  toString(): string {
    const [hue, saturation, lightness, alpha] = this.values()
    if (alpha === 1) {
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    } else {
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    }
  }

  // to RGB
  toRGB(): RGB {
    let [hue, saturation, lightness, alpha] = this.values()

    hue = hue < 0 ? (hue % Color.MAX_RGB) + Color.MAX_RGB : hue

    hue /= Color.MAX_HUE / 6
    lightness /= Color.MAX_PERCENT
    saturation /= Color.MAX_PERCENT

    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
    const x = chroma * (1 - Math.abs((hue % 2) - 1))
    const m = lightness - chroma / 2

    return new RGB(
      ...(hue < 1
        ? [chroma, x, 0]
        : hue < 2
        ? [x, chroma, 0]
        : hue < 3
        ? [0, chroma, x]
        : hue < 4
        ? [0, x, chroma]
        : hue < 5
        ? [x, 0, chroma]
        : [chroma, 0, x]
      ).map((v) => Math.round((v + m) * Color.MAX_RGB)),
      alpha
    )
  }
}

// const hsl = new HSL(96, 48, 59)
// console.log([140, 201, 100])
// console.log(hsl.toRGB())
