module.exports = {
  roots: ['<rootDir>/dist'],
  collectCoverageFrom: [
    '<rootDir>/dist/**/*.js',
    '!<rootDir>/dist/**/*-protocols.js',
    '!**/protocols/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig']
}
