import { getRGB, toRGB, toRGBPercentage } from '@color-utils/color'
import { arrayContaining, equal, strictEqual } from './test-utils'

describe('getRGB', () => {
  it('should return rgb value', () => {
    arrayContaining(getRGB('#fef'), [255, 238, 255, 1])
    arrayContaining(getRGB('#fffFEF'), [255, 255, 239, 1])
    arrayContaining(getRGB('rgb(244, 233, 100)'), [244, 233, 100, 1])
    arrayContaining(getRGB('rgb(244 233 100)'), [244, 233, 100, 1])
    arrayContaining(getRGB('rgb(100%, 30%, 90%)'), [255, 77, 229, 1])
    arrayContaining(getRGB('rgb(100% 30% 90%)'), [255, 77, 229, 1])
    arrayContaining(getRGB('transparent'), [0, 0, 0, 0])
  })

  it('subsequent return values should not change array', () => {
    arrayContaining(getRGB('blue'), [0, 0, 255, 1])
    arrayContaining(getRGB('blue'), [0, 0, 255, 1])
  })

  it('[with sign]', () => {
    arrayContaining(getRGB('rgb(-244, +233, -100)'), [0, 233, 0, 1])
    arrayContaining(getRGB('rgb(-244 +233 -100)'), [0, 233, 0, 1])
    arrayContaining(getRGB('rgba(200, +20, -233, -0.0)'), [200, 20, 0, 0])
    arrayContaining(getRGB('rgba(200 +20 -233 / -0.0)'), [200, 20, 0, 0])
    arrayContaining(getRGB('rgba(200, +20, -233, -0.0)'), [200, 20, 0, 0])
    arrayContaining(getRGB('rgba(200 +20 -233 / -0.0)'), [200, 20, 0, 0])
  })

  it('[with alpha]', () => {
    arrayContaining(getRGB('#c814e933'), [200, 20, 233, 0.2])
    arrayContaining(getRGB('#c814e900'), [200, 20, 233, 0])
    arrayContaining(getRGB('#c814e9ff'), [200, 20, 233, 1])
    arrayContaining(getRGB('#c814e9'), [200, 20, 233, 1])
    arrayContaining(getRGB('#fef'), [255, 238, 255, 1])
    arrayContaining(getRGB('rgba(200, 20, 233, 0.2)'), [200, 20, 233, 0.2])
    arrayContaining(getRGB('rgba(200 20 233 / 0.2)'), [200, 20, 233, 0.2])
    arrayContaining(getRGB('rgba(200 20 233 / 20%)'), [200, 20, 233, 0.2])
    arrayContaining(getRGB('rgba(200, 20, 233, 0)'), [200, 20, 233, 0])
    arrayContaining(getRGB('rgba(200 20 233 / 0)'), [200, 20, 233, 0])
    arrayContaining(getRGB('rgba(200 20 233 / 0%)'), [200, 20, 233, 0])
    arrayContaining(getRGB('rgba(100%, 30%, 90%, 0.2)'), [255, 77, 229, 0.2])
    arrayContaining(getRGB('rgba(100% 30% 90% / 0.2)'), [255, 77, 229, 0.2])
    arrayContaining(getRGB('rgba(100% 30% 90% / 20%)'), [255, 77, 229, 0.2])
  })

  it('[no alpha]', () => {
    arrayContaining(getRGB('#fef'), [255, 238, 255, 1])
    arrayContaining(getRGB('rgba(200, 20, 233)'), [200, 20, 233, 1])
    arrayContaining(getRGB('rgba(200 20 233)'), [200, 20, 233, 1])
    arrayContaining(getRGB('rgba(0, 0, 0, 0)'), [0, 0, 0, 0])
    arrayContaining(getRGB('rgba(0 0 0 / 0)'), [0, 0, 0, 0])
  })

  it('[range]', () => {
    arrayContaining(getRGB('rgba(300, 600, 100, 3)'), [255, 255, 100, 1])
    arrayContaining(getRGB('rgba(300 600 100 / 3)'), [255, 255, 100, 1])
    arrayContaining(getRGB('rgba(8000%, 100%, 333%, 88)'), [255, 255, 255, 1])
    arrayContaining(getRGB('rgba(8000% 100% 333% / 88)'), [255, 255, 255, 1])
  })

  it('[invalid]', () => {
    strictEqual(getRGB('yellowblue'), undefined)
    strictEqual(getRGB('hsl(100, 10%, 10%)'), undefined)
    strictEqual(getRGB('hsl(100 10% 10%)'), undefined)
    strictEqual(getRGB('hwb(100, 10%, 10%)'), undefined)
    strictEqual(getRGB('rgb(123, 255, 9)1234'), undefined)
    strictEqual(getRGB('rgb(123 255 9)1234'), undefined)
    strictEqual(getRGB('333333'), undefined)
    strictEqual(getRGB('1'), undefined)
    strictEqual(getRGB('1892371923879'), undefined)
    strictEqual(getRGB('444'), undefined)
    strictEqual(getRGB('#1'), undefined)
    strictEqual(getRGB('#f'), undefined)
    strictEqual(getRGB('#4f'), undefined)
    strictEqual(getRGB('#45ab4'), undefined)
    strictEqual(getRGB('#45ab45e'), undefined)
  })
})

describe('toRGB', () => {
  it('should return rgb/rgba string', () => {
    equal(toRGB([255, 10, 35]), 'rgb(255, 10, 35)')
    equal(toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)')
    equal(toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)')
    equal(toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)')
    equal(toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)')
    equal(toRGB([255, 10, 35], [0.3]), 'rgba(255, 10, 35, 0.3)')
    equal(toRGB([255, 10, 35]), 'rgb(255, 10, 35)')
    equal(toRGB([255, 10, 35, 0]), 'rgba(255, 10, 35, 0)')
  })
})

describe('toRGBPercentage', () => {
  equal(toRGBPercentage([255, 10, 35]), 'rgb(100%, 4%, 14%)')
  equal(toRGBPercentage([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)')
  equal(toRGBPercentage([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)')
  equal(toRGBPercentage([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)')
  equal(toRGBPercentage([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)')
  equal(toRGBPercentage([255, 10, 35]), 'rgb(100%, 4%, 14%)')
})
