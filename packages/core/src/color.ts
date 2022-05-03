import { RGB } from './rgb'
import { HSL } from './hsl'
import { CMYK } from './cmyk'
import { HWB } from './hwb'
import { LAB } from './lab'
import { XYZ } from './xyz'
import { HEX } from './hex'

export const isRGB = (v: unknown): v is RGB => v instanceof RGB
export const isHSL = (v: unknown): v is HSL => v instanceof HSL
export const isHWB = (v: unknown): v is HWB => v instanceof HWB
export const isLAB = (v: unknown): v is LAB => v instanceof LAB
export const isXYZ = (v: unknown): v is XYZ => v instanceof XYZ
export const isHEX = (v: unknown): v is HEX => v instanceof HEX
export const isCMYK = (v: unknown): v is CMYK => v instanceof CMYK

export interface IColor {
  toString(): string
  toNamed(): string
  toCMYK(): CMYK
  toHEX(): HEX
  toHSL(): HSL
  toHWB(): HWB
  toLAB(): LAB
  toRGB(): RGB
  toXYZ(): XYZ
}

export const Color = Object.freeze({
  MIN_ALPHA: 0,
  MAX_ALPHA: 1,

  MIN_PERCENT: 0,
  MAX_PERCENT: 100,

  MAX_HUE: 360,
  MIN_HUE: 0,

  MAX_RGB: 255,
  MIN_RGB: 0,

  isRGB,
  isHSL,
  isHWB,
  isLAB,
  isXYZ,
  isHEX,
  isCMYK,

  SRGB_D65_MATRIX: [
    [0.4124564, 0.3575761, 0.1804375], // x
    [0.2126729, 0.7151522, 0.072175], // y
    [0.0193339, 0.119192, 0.9503041] // z
  ],
  D65_ILLUMINANT_XYZ: [95.047, 100.0, 108.883],
  D65_EPSILON: 216.0 / 24389.0,
  D65_KAPPA: 24389.0 / 27.0
} as const)
