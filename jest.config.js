/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  preset: 'ts-jest',
  // coverage
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  // tests
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@color-utils/(.*?)$': '<rootDir>/packages/$1/src'
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: { '\\.[jt]sx?$': 'babel-jest' }
}
