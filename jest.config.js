/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/node_modules/', 'dist'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  roots: ['<rootDir>']
}
