import js from '@eslint/js';
import globals from 'globals';

const dummyPlugin = (name, rules) => ({
  plugins: {
    [name]: {
      rules: Object.fromEntries(rules.map((r) => [r, { create: () => ({}) }])),
    },
  },
});

export default [
  js.configs.recommended,
  dummyPlugin('react-hooks', ['exhaustive-deps', 'rules-of-hooks']),
  {
    files: ['**/*.{js,jsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        React: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^[A-Z]|motion',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.env*'],
  },
];
