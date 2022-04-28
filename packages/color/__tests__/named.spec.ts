import { getNamed, toNamed } from '@color-utils/color'
import { arrayContaining, equal, strictEqual } from './test-utils'

describe('getNamed', () => {
  it('should return rgb value', () => {
    arrayContaining(getNamed('yellow'), [255, 255, 0, 1])
    arrayContaining(getNamed('transparent'), [0, 0, 0, 0])
  })

  it('[invalid]', () => {
    strictEqual(getNamed('bumblebee'), undefined)
  })
})

describe('toNamed', () => {
  it('should return named string', () => {
    equal(toNamed([255, 255, 0]), 'yellow')
    equal(toNamed([100, 255, 0]), undefined)
  })
})
