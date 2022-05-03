import { divideBy, multiplyBy, setAlpha, setPercentage } from './utils'
import { Color } from './color'
import { RGB } from './rgb'
import type { IColor } from './color'
import type { HEX } from './hex'
import type { HSL } from './hsl'
import type { HWB } from './hwb'
import type { LAB } from './lab'
import type { XYZ } from './xyz'

export type CMYKKeys = 'cyan' | 'magenta' | 'yellow' | 'black'

export class CMYK extends Map<CMYKKeys, number> implements IColor {
  constructor(cyan = 0, magenta = 0, yellow = 0, black = 0, alpha = 1) {
    super()
    setPercentage<CMYKKeys>(this, 'cyan', cyan)
    setPercentage<CMYKKeys>(this, 'magenta', magenta)
    setPercentage<CMYKKeys>(this, 'yellow', yellow)
    setPercentage<CMYKKeys>(this, 'black', black)
    setAlpha(this, alpha)
  }

  toString(): string {
    const [cyan, magenta, yellow, black, alpha] = this.values()
    if (alpha === 1) {
      return `cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${black}%)`
    } else {
      return `cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${black}% / ${alpha})`
    }
  }

  toRGB(): RGB {
    let [cyan, magenta, yellow, black, alpha] = this.values()
    ;[cyan, magenta, yellow, black] = [cyan, magenta, yellow, black].map(
      divideBy(Color.MAX_PERCENT)
    )

    return new RGB(
      ...[
        1 - Math.min(1, cyan * (1 - black) + black),
        1 - Math.min(1, magenta * (1 - black) + black),
        1 - Math.min(1, yellow * (1 - black) + black)
      ].map(multiplyBy(Color.MAX_RGB)),
      alpha
    )
  }

  toCMYK(): CMYK {
    return this
  }

  toHEX(): HEX {
    return this.toRGB().toHEX()
  }

  toHSL(): HSL {
    return this.toRGB().toHSL()
  }

  toHWB(): HWB {
    return this.toRGB().toHWB()
  }

  toLAB(): LAB {
    return this.toRGB().toLAB()
  }

  toXYZ(): XYZ {
    return this.toRGB().toXYZ()
  }

  toNamed(): string {
    return this.toRGB().toNamed()
  }
}
