// 6 digits
// 3 digits - 6 digits abbreviation
// 8 digits - with alpha channel
// 4 digits - 8 digits abbreviation
export type HEX = string

export type Transparent = 'transparent'

export type LAB<
  Lightness extends number,
  A extends number,
  B extends number,
  Alpha extends number = 1
> = [Lightness, A, B, Alpha]

export type LCH<
  Lightness extends number,
  Chroma extends number,
  Hue extends number,
  Alpha extends number = 1
> = [Lightness, Chroma, Hue, Alpha]
