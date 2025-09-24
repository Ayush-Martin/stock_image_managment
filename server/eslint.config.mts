import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  // Base config for all JS/TS files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,

      // TypeScript recommended rules
      ...tseslint.configs.recommended[0].rules,

      // Use the TypeScript version of no-unused-vars and allow _-prefixed fields
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],

      // Turn off the ESLint built-in no-unused-vars (avoid conflict with TS version)
      "no-unused-vars": "off",
    },
  },

  // Specific rules for certain paths
  {
    files: ["src/domain/entities/**/*.ts", "src/shared/constants/**/*.ts"],
    rules: {
      // Disable no-unused-vars completely for these files
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
