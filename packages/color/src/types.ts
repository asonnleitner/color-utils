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
