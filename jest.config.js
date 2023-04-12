module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    'page-components/**/*.{js,jsx}',
    '!page-components/**/*.test.{js,jsx}',
    'shared/**/*.{js,jsx}',
    '!shared/**/*.test.{js,jsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'png', 'md', 'html'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md|html)$': '<rootDir>/fileTransformer.js',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@docs/(.*)$': '<rootDir>/docs/$1',
    '^@shared-components/(.*)$': '<rootDir>/docs/$1',
    '^@shared-libs/(.*)$': '<rootDir>/shared-libs/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@locales/(.*)$': '<rootDir>/locales/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@page-components/(.*)$': '<rootDir>/page-components/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '@next/font/(.*)': require.resolve('next/dist/build/jest/__mocks__/nextFontMock.js')
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/internals/', '<rootDir>/docs/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/internals/testing/test-bundler.js', '<rootDir>/jest.setup.js']
}
