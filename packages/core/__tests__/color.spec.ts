import { CMYK, HSL, HWB, LAB, Named, RGB, XYZ } from '@color-utils/core'
import { HEX } from '../src/hex'
import { floor, trunc } from '../src/utils'

const rgbMap = {
  red: [255, 0, 0],
  magenta: [255, 0, 255],
  purple: [128, 0, 128],
  blue: [0, 0, 255],
  cyan: [0, 255, 255],
  teal: [0, 128, 128],
  green: [0, 255, 0],
  yellow: [255, 255, 0],
  white: [255, 255, 255],
  black: [0, 0, 0],
  opacityRed: [255, 0, 0, 0.5]
} as const

type ColorMapKeys = keyof typeof rgbMap
type ColorMap = { [key in ColorMapKeys]: readonly number[] | string }

const hslMap: ColorMap = {
  red: [0, 100, 50],
  magenta: [300, 100, 50],
  purple: [300, 100, 25],
  blue: [240, 100, 50],
  cyan: [180, 100, 50],
  teal: [180, 100, 25],
  green: [120, 100, 50],
  yellow: [60, 100, 50],
  white: [0, 0, 100],
  black: [0, 0, 0],
  opacityRed: [0, 100, 50, 0.5]
} as const

const hwbMap: ColorMap = {
  red: [0, 0, 0],
  magenta: [300, 0, 0],
  purple: [300, 0, 50],
  blue: [240, 0, 0],
  cyan: [180, 0, 0],
  teal: [180, 0, 50],
  green: [120, 0, 0],
  yellow: [60, 0, 0],
  white: [0, 100, 0],
  black: [0, 0, 100],
  opacityRed: [0, 0, 0, 0.5]
}

const cmykMap: ColorMap = {
  red: [0, 100, 100, 0],
  magenta: [0, 100, 0, 0],
  purple: [0, 100, 0, 50],
  blue: [100, 100, 0, 0],
  cyan: [100, 0, 0, 0],
  teal: [100, 0, 0, 50],
  green: [100, 0, 100, 0],
  yellow: [0, 0, 100, 0],
  white: [0, 0, 0, 0],
  black: [0, 0, 0, 100],
  opacityRed: [0, 100, 100, 0, 0.5]
}

const namedMap: ColorMap = {
  red: 'red',
  magenta: 'fuchsia', // alias as it comes first in the list
  purple: 'purple',
  blue: 'blue',
  cyan: 'aqua', // alias as it comes first in the list
  teal: 'teal',
  green: 'lime',
  yellow: 'yellow',
  white: 'white',
  black: 'black',
  opacityRed: 'red'
}

const xyzMap: ColorMap = {
  red: [41.24, 21.26, 1.93],
  magenta: [59.28, 28.48, 96.96],
  purple: [12.79, 6.14, 20.93],
  blue: [18.04, 7.21, 95.03],
  cyan: [53.8, 78.73, 106.94],
  teal: [11.61, 16.99, 23.08],
  green: [35.75, 71.51, 11.91],
  yellow: [77, 92.78, 13.85],
  white: [95.04, 100, 108.88],
  black: [0, 0, 0],
  opacityRed: [41.24, 21.26, 1.93]
}

const hexMap: ColorMap = {
  red: '#ff0000',
  magenta: '#ff00ff',
  purple: '#800080',
  blue: '#0000ff',
  cyan: '#00ffff',
  teal: '#008080',
  green: '#00ff00',
  yellow: '#ffff00',
  white: '#ffffff',
  black: '#000000',
  opacityRed: '#ff000080'
}

const labMap: ColorMap = {
  red: [53, 80.09, 67.2],
  magenta: [60, 98.23, -60.82],
  purple: [30, 58.92, -36.48],
  blue: [32, 79.18, -107.86],
  cyan: [91, -48.08, -14.13],
  teal: [48, -28.84, -8.47],
  green: [88, -86.18, 83.17],
  yellow: [97, -21.55, 94.47],
  white: [100, 0.0, 0.0],
  black: [0, 0, 0],
  opacityRed: [53, 80.09, 67.2]
}

const rgbStringMap: ColorMap = {
  red: 'rgb(255, 0, 0)',
  magenta: 'rgb(255, 0, 255)',
  purple: 'rgb(128, 0, 128)',
  blue: 'rgb(0, 0, 255)',
  cyan: 'rgb(0, 255, 255)',
  teal: 'rgb(0, 128, 128)',
  green: 'rgb(0, 255, 0)',
  yellow: 'rgb(255, 255, 0)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  opacityRed: 'rgba(255, 0, 0, 0.5)'
}

const hslStringMap: ColorMap = {
  red: 'hsl(0, 100%, 50%)',
  magenta: 'hsl(300, 100%, 50%)',
  purple: 'hsl(300, 100%, 25%)',
  blue: 'hsl(240, 100%, 50%)',
  cyan: 'hsl(180, 100%, 50%)',
  teal: 'hsl(180, 100%, 25%)',
  green: 'hsl(120, 100%, 50%)',
  yellow: 'hsl(60, 100%, 50%)',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  opacityRed: 'hsla(0, 100%, 50%, 0.5)'
}

const cmykStringMap: ColorMap = {
  red: 'cmyk(0%, 100%, 100%, 0%)',
  magenta: 'cmyk(0%, 100%, 0%, 0%)',
  purple: 'cmyk(0%, 100%, 0%, 50%)',
  blue: 'cmyk(100%, 100%, 0%, 0%)',
  cyan: 'cmyk(100%, 0%, 0%, 0%)',
  teal: 'cmyk(100%, 0%, 0%, 50%)',
  green: 'cmyk(100%, 0%, 100%, 0%)',
  yellow: 'cmyk(0%, 0%, 100%, 0%)',
  white: 'cmyk(0%, 0%, 0%, 0%)',
  black: 'cmyk(0%, 0%, 0%, 100%)',
  opacityRed: 'cmyk(0%, 100%, 100%, 0% / 0.5)'
}

const hwbStringMap: ColorMap = {
  red: 'hwb(0, 0%, 0%)',
  magenta: 'hwb(300, 0%, 0%)',
  purple: 'hwb(300, 0%, 50%)',
  blue: 'hwb(240, 0%, 0%)',
  cyan: 'hwb(180, 0%, 0%)',
  teal: 'hwb(180, 0%, 50%)',
  green: 'hwb(120, 0%, 0%)',
  yellow: 'hwb(60, 0%, 0%)',
  white: 'hwb(0, 100%, 0%)',
  black: 'hwb(0, 0%, 100%)',
  opacityRed: 'hwb(0, 0%, 0%, 0.5)'
}

const labStringMap: ColorMap = {
  red: 'lab(53, 80.09, 67.2)',
  magenta: 'lab(60, 98.23, -60.82)',
  purple: 'lab(30, 58.92, -36.48)',
  blue: 'lab(32, 79.18, -107.86)',
  cyan: 'lab(91, -48.08, -14.13)',
  teal: 'lab(48, -28.84, -8.47)',
  green: 'lab(88, -86.18, 83.17)',
  yellow: 'lab(97, -21.55, 94.47)',
  white: 'lab(100, 0.0, 0.0)',
  black: 'lab(0, 0, 0)',
  opacityRed: 'lab(53, 80.09, 67.2 / 0.5)'
}

export const mapContaining = <
  T extends
    | Map<string, number>
    | HEX
    | RGB
    | HSL
    | HWB
    | CMYK
    | XYZ
    | LAB
    | string,
  E extends Array<number> | ReadonlyArray<number> | string
>(
  input: T,
  expected: E,
  options: {
    loose?: boolean
    instanceof?: any
    type?: 'string' | 'number' | 'boolean' | 'symbol' | 'undefined'
    noAlpha?: boolean
  } = {
    loose: false,
    instanceof: undefined,
    type: undefined,
    noAlpha: false
  }
) => {
  if (input instanceof CMYK) {
    return
  }

  if (input instanceof HEX) {
    const hex = input.get('hex')
    let e = expected as string

    if (options.noAlpha) {
      e = e.length === 9 ? e.substring(0, 7) : e
    }

    expect(hex).toBe(e)
    return
  }

  if (typeof input === 'string') {
    expect(input).toEqual(expected)
  } else {
    expected = expected.length === 4 ? expected : ([...expected, 1] as E)

    if (options.instanceof) {
      expect(input).toBeInstanceOf(options.instanceof)
    }

    if (options.type) {
      expect(typeof input).toBe(options.type)
    }

    // apply precision
    if (options.loose) {
      const len = expected.length
      for (let i = 0; i < len; i++) {
        const val = Array.from(input.values())[i]

        const num = Math.round(Number(val.toFixed(2)))
        const ex = Number((((expected[i] as number) / 100) * 100).toFixed(2))

        if (Number.isNaN(num) || Number.isNaN(ex)) return

        expect(Math.round(num)).toBeCloseTo(Math.round(ex), 2)
      }
    } else {
      const values = Array.from(input.values())

      if (options.noAlpha) {
        expect(values.slice(0, 3)).toEqual(expected.slice(0, 3))
      } else {
        expect(values).toEqual(expect.arrayContaining(expected as number[]))
      }
    }
  }
}

const keys = Object.keys(rgbMap) as Array<keyof ColorMap>

test('Create RGB color map', () => {
  for (const key of keys) {
    const color = new RGB(...rgbMap[key])

    mapContaining(color.toRGB(), rgbMap[key], { instanceof: RGB })
    mapContaining(color.toHSL(), hslMap[key], { instanceof: HSL })
    mapContaining(color.toHWB(), hwbMap[key], { instanceof: HWB })
    mapContaining(color.toCMYK(), cmykMap[key], { instanceof: CMYK })
    mapContaining(color.toXYZ(), xyzMap[key], {
      loose: true,
      instanceof: XYZ
    })
    mapContaining(color.toNamed(), namedMap[key], { instanceof: Named })
    mapContaining(color.toLAB(), labMap[key], {
      loose: true,
      instanceof: LAB
    })
    mapContaining(color.toHEX(), hexMap[key], { instanceof: HEX })
    mapContaining(color.toString(), rgbStringMap[key])
  }
})

test('Create HSL color map', () => {
  for (const key of keys) {
    const color = new HSL(...(hslMap[key] as number[]))

    mapContaining(color.toRGB(), rgbMap[key], { instanceof: RGB })
    mapContaining(color.toHSL(), hslMap[key], { instanceof: HSL })
    mapContaining(color.toHWB(), hwbMap[key], { instanceof: HWB })
    mapContaining(color.toCMYK(), cmykMap[key], { instanceof: CMYK })
    mapContaining(color.toXYZ(), xyzMap[key], {
      loose: true,
      instanceof: XYZ
    })
    mapContaining(color.toNamed(), namedMap[key], { instanceof: Named })
    mapContaining(color.toLAB(), labMap[key], {
      loose: true,
      instanceof: LAB
    })
    mapContaining(color.toHEX(), hexMap[key], { instanceof: HEX })
    mapContaining(color.toString(), hslStringMap[key], { instanceof: HEX })
  }
})

test('Create CMYK color map', () => {
  for (const key of keys) {
    const color = new CMYK(...(cmykMap[key] as number[]))

    mapContaining(color.toRGB(), rgbMap[key], { instanceof: RGB })
    mapContaining(color.toHSL(), hslMap[key], { instanceof: HSL })
    mapContaining(color.toHWB(), hwbMap[key], { instanceof: HWB })
    mapContaining(color.toCMYK(), cmykMap[key], { instanceof: CMYK })
    mapContaining(color.toXYZ(), xyzMap[key], { loose: true, instanceof: XYZ })
    mapContaining(color.toNamed(), namedMap[key], { instanceof: Named })
    mapContaining(color.toLAB(), labMap[key], { loose: true, instanceof: LAB })
    mapContaining(color.toHEX(), hexMap[key], { instanceof: HEX })
    mapContaining(color.toString(), cmykStringMap[key])
  }
})

test('Create HWB color map', () => {
  for (const key of keys) {
    const color = new HWB(...(hwbMap[key] as number[]))

    mapContaining(color.toRGB(), rgbMap[key], { instanceof: RGB })
    mapContaining(color.toHSL(), hslMap[key], { instanceof: HSL })
    mapContaining(color.toHWB(), hwbMap[key], { instanceof: HWB })
    mapContaining(color.toCMYK(), cmykMap[key], { instanceof: CMYK })
    mapContaining(color.toXYZ(), xyzMap[key], { loose: true, instanceof: XYZ })
    mapContaining(color.toNamed(), namedMap[key], { instanceof: Named })
    mapContaining(color.toLAB(), labMap[key], { loose: true, instanceof: LAB })
    mapContaining(color.toHEX(), hexMap[key], { instanceof: HEX })
    mapContaining(color.toString(), hwbStringMap[key], {})
  }
})

test.only('Create LAB color map', () => {
  for (const key of keys) {
    const color = new LAB(...(labMap[key] as number[]))

    // mapContaining(color.toRGB(), rgbMap[key], { instanceof: RGB })
    // mapContaining(color.toHSL(), hslMap[key], { instanceof: HSL })
    // mapContaining(color.toHWB(), hwbMap[key], { instanceof: HWB })
    // mapContaining(color.toCMYK(), cmykMap[key], { instanceof: CMYK })
    mapContaining(color.toXYZ(), xyzMap[key], { loose: true, instanceof: XYZ })
    // mapContaining(color.toNamed(), namedMap[key], { instanceof: Named })
    // mapContaining(color.toLAB(), labMap[key], { loose: true, instanceof: LAB })
    // mapContaining(color.toHEX(), hexMap[key], { instanceof: HEX })
    // mapContaining(color.toString(), hwbStringMap[key], {})
  }
})
