import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import path from "path";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "dist/**",
      "**/*.config.js",
      "**/*.config.mjs"
    ]
  },
  {
    files: ["src/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended
    ],
    plugins: {
      "@stylistic": stylistic,
      quotes: ["error", "single"], // Mudar para single quotes

    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: path.dirname(import.meta.url).replace(/^file:\/\//, '')
      }
    },

    rules: {
      "quotes": ["error", "single", { "avoidEscape": true }],
      //"no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true, "varsIgnorePattern": "^_.*" }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "semi": ['error', 'always'],
 

    },
  },
  {
    files: ["**/*.spec.ts"],
   
  },
  
);