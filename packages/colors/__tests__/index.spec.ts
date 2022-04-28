import { colors } from '@color-utils/colors'

describe('colors', () => {
  it('should return an object', () => {
    expect(typeof colors).toBe('object')
  })

  it('should return blue rgb', () => {
    const blue = [0, 0, 255]
    expect(colors.blue).toEqual(blue)
  })
})
