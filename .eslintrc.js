const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    jest: 'readonly'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] }
    }
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off'
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
  rules: {
    camelcase: ['error', { properties: 'never' }],
    'no-console': ['warn', { allow: ['error'] }],
    'no-debugger': 'warn',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-return-await': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prefer-const': [
      'warn',
      { destructuring: 'all', ignoreReadBeforeAssign: true }
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true }
    ],
    'object-shorthand': [
      'error',
      'always',
      { ignoreConstructors: false, avoidQuotes: true }
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    // best-practice
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',

    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false
      }
    ],

    // stylistic-issues
    'prefer-exponentiation-operator': 'error',

    // ts
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false }
    ],
    // prettier
    'prettier/prettier': 'error',

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],

        pathGroups: [
          {
            pattern: '@color-utils/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['type']
      }
    ],
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off'
  }
})
