module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'i18next',
    'react-hooks',
    'rich1e-plugin',
    'unused-imports',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '_' }],
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'rich1e-plugin/layer-imports': [
      'error',
      { alias: '@', ignoreImportPatterns: ['**/StoreProvider', '**/testing'] },
    ],
    'rich1e-plugin/path-checker': ['error', { alias: '@' }],
    'rich1e-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}', './scripts/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '**/src/**/*.test.{ts,tsx}',
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
  ignorePatterns: ['*.js'],
};
