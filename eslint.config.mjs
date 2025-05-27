import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{ts}"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: [
      "playwright-report/**/*",
      "playwright.config.ts",
      "node_modules/**",
      "eslint.config.mjs",
    ],
  },
  {
    // Configure language options for type checking
    languageOptions: {
      parserOptions: {
        project: true, // Use the tsconfig.json in the root
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "eslint-disable no-empty-pattern": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "no-unused-expressions": "warn",
      "no-constant-binary-expression": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
];
