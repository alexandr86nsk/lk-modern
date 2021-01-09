module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleDirectories: ['src', 'node_modules'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '.(js|jsx)$': require.resolve('babel-jest'),
    '.(ts|tsx)$': require.resolve('ts-jest'),
    '\\.svg$': "jest-svg-transformer"
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
  testURL: 'http://localhost',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|doc|docx|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/__mocks__/svgrMock.ts',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@assets/(.*)': '<rootDir>/assetssadads/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '^uikit/(.*)$': '<rootDir>/../ui-kit/exposes/$1',
    '^react$': '<rootDir>/node_modules/react',
  },
  setupFilesAfterEnv: ['<rootDir>/test.setup.ts'],
  coverageThreshold: {
    './src/components/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/pages/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/utils/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  "testTimeout": 50000,
};
