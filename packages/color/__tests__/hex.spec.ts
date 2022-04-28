import { fixHex, toHEX } from '@color-utils/color'
import { equal, strictEqual } from './test-utils'

describe('getHEX', () => {
  it('should return named value', () => {
    // arrayContaining(getHEX('yellow'), [255, 255, 0, 1])
    // arrayContaining(getHEX('transparent'), [0, 0, 0, 0])
  })

  it('[with alpha]', () => {
    // deepEqual(normalizeAlpha(getRGB('#fffa')), [255, 255, 255, '0.67']);
  })
})

describe('toHEX', () => {
  it('should return hex string', () => {
    equal(toHEX([255, 10, 35]), '#FF0A23')
    equal(toHEX([255, 10, 35, 1]), '#FF0A23')
    equal(toHEX([255, 10, 35], 1), '#FF0A23')
    equal(toHEX([255, 10, 35, 0.3]), '#FF0A234D')
    equal(toHEX([255, 10, 35], 0.3), '#FF0A234D')
    equal(toHEX([255, 10, 35, 0]), '#FF0A2300')
    equal(toHEX([255, 10, 35], 0), '#FF0A2300')
  })

  it("Make sure writing decimal values as hex doesn't cause bizarre output", () => {
    equal(toHEX([44.2, 83.8, 44]), '#2C542C')
  })
})

describe('fixAlpha', () => {
  it('fix hex alpha', () => {
    strictEqual(fixHex('#123'), '#112233')
    strictEqual(fixHex('#1234'), '#11223344')
    strictEqual(fixHex('#12345'), '#11223344')
    strictEqual(fixHex('#123456'), '#123456')
    strictEqual(fixHex('#1234567'), '#123456')
    strictEqual(fixHex('#12345678'), '#12345678')
    strictEqual(fixHex('123'), '#112233')
    strictEqual(fixHex('1234'), '#11223344')
    strictEqual(fixHex('12345'), '#11223344')
    strictEqual(fixHex('123456'), '#123456')
    strictEqual(fixHex('1234567'), '#123456')
    strictEqual(fixHex('12345678'), '#12345678')
    // number
    strictEqual(fixHex(123), '#112233')
    strictEqual(fixHex(1234), '#11223344')
    strictEqual(fixHex(12345), '#11223344')
    strictEqual(fixHex(123456), '#123456')
    strictEqual(fixHex(1234567), '#123456')
    strictEqual(fixHex(12345678), '#12345678')
  })
})
