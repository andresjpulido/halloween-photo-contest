//import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
//import js from "@eslint/js";
import { parser } from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  //js.configs.recommended,
  //eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,

  {
    languageOptions: {
      parser,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      indent: ["error", 4],
      quotes: ["error", "single"],
      semi: ["error", "never"],
    },
    files: ["**/*.ts", "**/*.tsx"],
  },
];
