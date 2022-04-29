export const strictEqual = <T, E>(input: T, result: E) =>
  expect(input).toStrictEqual(result)

export const arrayContaining = <T, E extends Array<unknown>>(
  input: T,
  expected: E
) => expect(input).toEqual(expect.arrayContaining(expected))

export const equal = <T, E>(input: T, result: E) =>
  expect(input).toEqual(result)
