const createJestConfig = (overrides = {}) => ({
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  ...overrides,
});

module.exports = createJestConfig({
  projects: [
    '<rootDir>/packages/*/jest.config.js',
  ],
});

module.exports.createJestConfig = createJestConfig;
