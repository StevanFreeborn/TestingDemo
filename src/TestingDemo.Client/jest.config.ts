import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: {
    name: 'TestingDemo.Client',
    color: 'blue',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'tests/coverage',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testMatch: ['**/tests/**/*.(test|spec|jest).(js|ts|jsx|tsx)'],
  transform: {
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/utils/fileTransformer.js',
  },
};

export default config;
