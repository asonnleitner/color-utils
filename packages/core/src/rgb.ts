import { Color } from './color'
import { HSL } from './hsl'
import { HWB } from './hwb'
import { CMYK } from './cmyk'
import { Named } from './named'
import { XYZ } from './xyz'
import { LAB } from './lab'
import { HEX } from './hex'
import { divideBy, multiplyBy, setAlpha, setColorChannel } from './utils'
import type { IColor } from './color'

export type RGBKeys = 'red' | 'green' | 'blue' | 'alpha'

export class RGB extends Map<RGBKeys, number> implements IColor {
  constructor(red = 0, green = 0, blue = 0, alpha = 1) {
    super()
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  set red(value: number) {
    setColorChannel(this, 'red', value)
  }

  set green(value: number) {
    setColorChannel(this, 'green', value)
  }

  set blue(value: number) {
    setColorChannel(this, 'blue', value)
  }

  set alpha(value: number) {
    setAlpha(this, value)
  }

  set rgb(rgb: [number, number, number]) {
    this.red = rgb[0]
    this.green = rgb[1]
    this.blue = rgb[2]
  }

  toRGB() {
    return this
  }

  toString() {
    const [red, green, blue, alpha] = this.values()
    if (alpha === 1) {
      return `rgb(${red}, ${green}, ${blue})`
    } else {
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }
  }

  toHEX(): HEX {
    return new HEX(this)
  }

  // to HSL
  toHSL() {
    let [red, green, blue, alpha] = this.values()

    ;[red, green, blue] = [red, green, blue].map(divideBy(Color.MAX_RGB))

    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)

    const delta = max - min

    let hue = 0
    let saturation = 0
    const lightness = (max + min) / 2

    if (delta !== 0) {
      saturation =
        lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min)

      switch (max) {
        case red: {
          hue = (green - blue) / delta + (green < blue ? 6 : 0)
          break
        }
        case green: {
          hue = (blue - red) / delta + 2
          break
        }
        case blue: {
          hue = (red - green) / delta + 4
          break
        }
      }

      hue /= 6
    }

    return new HSL(
      hue * Color.MAX_HUE,
      ...[saturation, lightness].map(multiplyBy(Color.MAX_PERCENT)),
      alpha
    )
  }

  // to HWB
  toHWB() {
    const [red, green, blue, alpha] = this.values()
    const hue = this.toHSL().get('hue')

    return new HWB(
      hue,
      ...[
        (1 / Color.MAX_RGB) * Math.min(red, Math.min(green, blue)), // white
        1 - (1 / Color.MAX_RGB) * Math.max(red, Math.max(green, blue)) // black
      ].map(multiplyBy(Color.MAX_PERCENT)),
      alpha
    )
  }

  // to CMYK
  toCMYK() {
    let [red, green, blue] = this.values()
    ;[red, green, blue] = [red, green, blue].map(divideBy(Color.MAX_RGB))

    const black = Math.min(1 - red, 1 - green, 1 - blue)

    return new CMYK(
      ...[
        (1 - red - black) / (1 - black) || 0, // cyan
        (1 - green - black) / (1 - black) || 0, // magenta
        (1 - blue - black) / (1 - black) || 0 // yellow
      ].map(multiplyBy(Color.MAX_PERCENT)),
      black * 100
    )
  }

  // to named
  toNamed() {
    return Named.closest(this)
  }

  // to linear sRGB (gamma corrected)
  // to XYZ
  toXYZ() {
    const [X, Y, Z] = Color.SRGB_D65_MATRIX

    let [red, green, blue] = this.values()
    ;[red, green, blue] = [red, green, blue]
      .map(divideBy(Color.MAX_RGB))
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))

    return new XYZ(
      ...[
        red * X[0] + green * X[1] + blue * X[2],
        red * Y[0] + green * Y[1] + blue * Y[2],
        red * Z[0] + green * Z[1] + blue * Z[2]
      ].map(multiplyBy(Color.MAX_PERCENT))
    )
  }

  // to LAB
  toLAB() {
    let [x, y, z] = this.toXYZ().values()

    const [_x, _y, _z] = Color.D65_ILLUMINANT_XYZ

    x /= _x
    y /= _y
    z /= _z
    ;[x, y, z] = [x, y, z].map((v) =>
      v > Color.D65_EPSILON ? Math.cbrt(v) : (Color.D65_KAPPA * v + 16) / 116
    )

    return new LAB(116 * y - 16, 500 * (x - y), 200 * (y - z))
  }
}

// const rgb = new RGB(140, 200, 100)
// console.log(rgb.toHSL())
// console.log([96, 48, 59])

// const rgb2 = new RGB(140, 200, 100)
// console.log(rgb2.toHWB())
// console.log([96, 39, 22])

// const rgb3 = new RGB(140, 200, 100)
// console.log([30, 0, 50, 22])
// console.log(rgb3.toCMYK())

// const rgb4 = new RGB(0, 0, 0)
// console.log([0, 0, 0, 100])
// console.log(rgb4.toCMYK())

// const rgb5 = new RGB(255, 228, 196)
// console.log(rgb5.toNamed())

// const rgb6 = new RGB(92, 191, 84)
// console.log(rgb6.toXYZ())
// console.log([25, 40, 15])

// const rgb7 = new RGB(92, 191, 84)
// console.log([70, -50, 45])
// console.log(rgb7.toLAB())
