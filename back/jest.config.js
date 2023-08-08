const commonConfig = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest', {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: false,
            dynamicImport: true,
          },
          transform: null,
          target: "es2021",
          loose: false,
          externalHelpers: true,
          keepClassNames: true,
          baseUrl: ".",
          paths: {
            "@container/*": ["src/container/*"],
            "@application/*": ["src/application/*"],
            "@domain/*": ["src/domain/*"],
            "@infrastructure/*": ["src/infrastructure/*"],
            "@utils/*": ["src/utils/*"],
          }
        },
    }],
  },
  // rootDir: '../',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src/'],
  // resolver: undefined,
};

// console.log(commonConfig.moduleNameMapper);

const projects = [
  {
    displayName: 'unit',
    ...commonConfig,
    testMatch: ['<rootDir>/tests/unit/**/*.unit.test.ts'],
  },
  {
    displayName: 'integration',
    ...commonConfig,
    testMatch: ['<rootDir>/tests/integration/**/*.integration.test.ts'],
  },
  {
    displayName: 'service',
    ...commonConfig,
    testMatch: ['<rootDir>/tests/service/**/*.service.test.ts'],
  },
];

module.exports = {
  projects,
  // moduleNameMapper: {
  //   '/^@application/(.*)$/':
  //     '/Users/anael/Developer/8-stacks/8stacks-backend-main/src/application/$1',
  // },
  // resolver: undefined,
};
