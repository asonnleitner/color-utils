/* MIT license */

const cs = (module.exports = {
  to: {},
  get: {}
})

cs.get = function (string) {
  const prefix = string.substring(0, 3).toLowerCase()
  let val
  let model
  switch (prefix) {
    case 'hsl':
      val = cs.get.hsl(string)
      model = 'hsl'
      break
    case 'hwb':
      val = cs.get.hwb(string)
      model = 'hwb'
      break
    default:
      val = cs.get.rgb(string)
      model = 'rgb'
      break
  }

  if (!val) {
    return null
  }

  return { model, value: val }
}
