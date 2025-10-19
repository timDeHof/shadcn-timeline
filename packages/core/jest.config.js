const { createJestConfig } = require('../../jest.config');

module.exports = createJestConfig({
  displayName: 'core',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
});