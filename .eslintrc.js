/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-unnecessary-template-expression': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/restrict-template-expressions': ['off', { allowNumber: true }],
        '@typescript-eslint/no-misused-promises': ['off', { checksVoidReturn: false }],
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',

      }
    },
  ],
};