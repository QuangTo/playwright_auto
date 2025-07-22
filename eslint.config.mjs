import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// import playwright from 'eslint-plugin-playwright';

export default [
  { files: ['**/*.{ts}'] },
  eslint.configs.recommended,
  // ...playwright.configs['flat/recommended'],
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: ['playwright-report/**/*', 'playwright.config.ts', 'node_modules/**', 'eslint.config.mjs']
  },
  {
    // Configure language options for type checking
    languageOptions: {
      parserOptions: {
        project: true // Use the tsconfig.json in the root
      }
    },
    rules: {
      // ...playwright.configs['flat/recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      // 'eslint-disable no-empty-pattern': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      'no-unused-expressions': 'warn',
      'no-constant-binary-expression': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn'
    }
  }
];
