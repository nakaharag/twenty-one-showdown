module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.(ts|tsx)',
    '<rootDir>/tests/unit/**/*.spec.(ts|tsx)'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
