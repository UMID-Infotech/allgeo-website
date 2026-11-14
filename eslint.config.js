import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  // React / Vite frontend
  {
    files: ["src/**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // UI primitives export styling helpers alongside components.
  {
    files: ["src/components/ui/**/*.jsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },

  // Node / Express backend
  {
    files: ["server/**/*.js"],

    extends: [js.configs.recommended],

    languageOptions: {
      globals: globals.node,
    },
  },
]);
