import { flatten, flattenDeep } from '@color-utils/color'
import { arrayContaining } from './test-utils'

test('flatten array', () => {
  arrayContaining(flatten(), [])
  arrayContaining(flatten([]), [])
  arrayContaining(flatten(1), [1])

  arrayContaining(flatten([1, '2', 3]), [1, '2', 3])
  arrayContaining(flatten([1, [1, 2]]), [1, 1, 2])
  arrayContaining(flatten([1, [1, [2]]]), [1, 1, [2]])

  arrayContaining(flatten([1, 2, 3]), [1, 2, 3])
  arrayContaining(flatten([1, [2, 3]]), [1, 2, 3])
  arrayContaining(flattenDeep([1, [2, [3]]]), [1, 2, 3])
  arrayContaining(flattenDeep([1, [2, [3, [4]]]]), [1, 2, 3, 4])
})
