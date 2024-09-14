import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {ignores: [
    "**/dist/**",
    "**/coverage/**",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs"
  ]},
  {files: ["**/*.{mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];