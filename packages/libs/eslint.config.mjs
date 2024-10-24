//import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
//import js from "@eslint/js";

export default [
  //js.configs.recommended,
  //eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      indent: ["error", 4],
      quotes: ["error", "single"],
      semi: ["error", "never"]
    },
    files: ["**/*.ts",],
  },
];
