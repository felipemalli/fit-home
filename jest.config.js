module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '!**/protocols/**',
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
