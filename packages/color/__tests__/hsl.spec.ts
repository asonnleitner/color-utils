import { getHSL, toHSL } from '@color-utils/color'
import { arrayContaining, equal, strictEqual } from './test-utils'

describe('getHSL', () => {
  it('should return hsl value', () => {
    arrayContaining(getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsl(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsl(240deg 100% 50.5%)'), [240, 100, 50.5, 1])
  })

  it('[with sign]', () => {
    arrayContaining(getHSL('hsl(+240, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsl(+240 100% 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsla(+200, 100%, 50%, -0.2)'), [200, 100, 50, 0])
    arrayContaining(getHSL('hsla(+200, 100%, 50%, -1e-7)'), [200, 100, 50, 0])
    arrayContaining(getHSL('hsl(+200 100% 50% / -0.2)'), [200, 100, 50, 0])
    arrayContaining(getHSL('hsl(+200 100% 50% / -1e-7)'), [200, 100, 50, 0])
    arrayContaining(getHSL('hsl(+200 100% 50% / -2.e7)'), [200, 100, 50, 0])
    arrayContaining(getHSL('hsl(+200 100% 50% / +1e7)'), [200, 100, 50, 1])
    arrayContaining(getHSL('hsl(+200 100% 50% / 127.88e4)'), [200, 100, 50, 1])
    arrayContaining(getHSL('hsl(+200 100% 50% / 0.2e3)'), [200, 100, 50, 1])
    arrayContaining(getHSL('hsl(+200 100% 50% / .1e-4)'), [200, 100, 50, 1e-5])
    arrayContaining(getHSL('hsla(-10.0, 100%, 50%, -0.2)'), [350, 100, 50, 0])
    arrayContaining(getHSL('hsl(-10.0 100% 50% / -0.2)'), [350, 100, 50, 0])
    arrayContaining(getHSL('hsla(.5, 100%, 50%, -0.2)'), [0.5, 100, 50, 0])
    arrayContaining(getHSL('hsl(.5 100% 50% / -0.2)'), [0.5, 100, 50, 0])
  })

  it('[with alpha]', () => {
    arrayContaining(getHSL('hsla(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2])
    arrayContaining(getHSL('hsla(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7])
    arrayContaining(getHSL('hsl(200 20% 33% / 0.2)'), [200, 20, 33, 0.2])
    arrayContaining(getHSL('hsl(200 20% 33% / 1e-7)'), [200, 20, 33, 1e-7])
  })

  it('[no alpha]', () => {
    arrayContaining(getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHSL('hsla(0, 0%, 0%, 0)'), [0, 0, 0, 0])
    arrayContaining(getHSL('hsl(0 0% 0% / 0)'), [0, 0, 0, 0])
    arrayContaining(getHSL('hsl(0deg 0% 0% / 0)'), [0, 0, 0, 0])
  })

  it('[range]', () => {
    arrayContaining(getHSL('hsla(400, 10%, 200%, 10)'), [40, 10, 100, 1])
    arrayContaining(getHSL('hsl(400 10% 200% / 10)'), [40, 10, 100, 1])
  })

  it('[invalid]', () => {
    strictEqual(getHSL('hsl(41, 50%, 45%)1234'), undefined)
    strictEqual(getHSL('hsl(41 50% 45%)1234'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / 3)1234'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / 1e)'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / e)'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / 0e-)'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / 0e+)'), undefined)
    strictEqual(getHSL('hsl(41 50% 45% / +000e33)'), undefined)
  })
})

describe('toHSL', () => {
  it('should return hsl/hsla string', () => {
    equal(toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)')
    equal(toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)')
    equal(toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)')
    equal(toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)')
    equal(toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)')
    equal(toHSL([280, 40, 60], [0.3]), 'hsla(280, 40%, 60%, 0.3)')
    equal(toHSL([280, 40, 60], 0), 'hsla(280, 40%, 60%, 0)')
    equal(toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)')
  })
})
