export const strictEqual = <T, Res>(input: T, result: Res) =>
  expect(input).toStrictEqual(result)

export const arrayContaining = <T, Res extends Array<number>>(
  input: T,
  expected: Res
) => expect(input).toEqual(expect.arrayContaining(expected))

export const equal = <T, Res>(input: T, result: Res) =>
  expect(input).toEqual(result)
