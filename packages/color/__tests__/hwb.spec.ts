import { getHWB, toHWB } from '@color-utils/color'
import { arrayContaining, equal, strictEqual } from './test-utils'

describe('getHWB', () => {
  it('should return hwb value', () => {
    arrayContaining(getHWB('hwb(240, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHWB('hwb(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1])
  })

  it('[with sign]', () => {
    arrayContaining(getHWB('hwb(+240, 100%, 50.5%)'), [240, 100, 50.5, 1])
    arrayContaining(getHWB('hwb(-240deg, 100%, 50.5%)'), [120, 100, 50.5, 1])
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, +0.6)'),
      [120, 100, 50.5, 0.6]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, +1e-7)'),
      [120, 100, 50.5, 1e-7]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, -2.e7)'),
      [120, 100, 50.5, 0]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, +1e7)'),
      [120, 100, 50.5, 1]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, +1e7)'),
      [120, 100, 50.5, 1]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, 127.88e4)'),
      [120, 100, 50.5, 1]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, 0.2e3)'),
      [120, 100, 50.5, 1]
    )
    arrayContaining(
      getHWB('hwb(-240deg, 100%, 50.5%, .1e-4)'),
      [120, 100, 50.5, 1e-5]
    )
    arrayContaining(getHWB('hwb(10.0deg, 100%, 50.5%)'), [10, 100, 50.5, 1])
    arrayContaining(getHWB('hwb(-.5, 100%, 50.5%)'), [359.5, 100, 50.5, 1])
    arrayContaining(
      getHWB('hwb(-10.0deg, 100%, 50.5%, +0.6)'),
      [350, 100, 50.5, 0.6]
    )
  })

  it('[with alpha]', () => {
    arrayContaining(getHWB('hwb(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2])
    arrayContaining(getHWB('hwb(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7])
  })

  it('[no alpha]', () => {
    arrayContaining(getHWB('hwb(400, 10%, 200%, 0)'), [40, 10, 100, 0])
  })

  it('[range]', () => {
    arrayContaining(getHWB('hwb(400, 10%, 200%, 10)'), [40, 10, 100, 1])
  })

  it('[invalid]', () => {
    strictEqual(getHWB('hwb(240, 100%, 1e'), undefined)
    strictEqual(getHWB('hwb(240, 100%, e'), undefined)
    strictEqual(getHWB('hwb(240, 100%, 0e-'), undefined)
    strictEqual(getHWB('hwb(240, 100%, 0e+'), undefined)
    strictEqual(getHWB('hwb(240, 100%, +000e33'), undefined)
  })
})

describe('toHWB', () => {
  it('should return hwb string', () => {
    equal(toHWB([280, 40, 60]), 'hwb(280, 40%, 60%)')
    equal(toHWB([280, 40, 60, 0.3]), 'hwb(280, 40%, 60%, 0.3)')
    equal(toHWB([280, 40, 60], 0.3), 'hwb(280, 40%, 60%, 0.3)')
    equal(toHWB([280, 40, 60], [0.3]), 'hwb(280, 40%, 60%, 0.3)')
    equal(toHWB([280, 40, 60], 0), 'hwb(280, 40%, 60%, 0)')
  })
})
