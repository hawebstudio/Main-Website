import js from "@eslint/js"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"

const eslintConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", ".next", "out", "public"],
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      ...reactHooks.configs.recommended.rules,
    },
  },
]

export default eslintConfig