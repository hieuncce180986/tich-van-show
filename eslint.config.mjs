import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable rules for 'any' type
      "@typescript-eslint/no-explicit-any": "off",
      // Disable rules for unused variables
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      // Disable rules for unused parameters
      "@typescript-eslint/no-unused-params": "off",
    },
  },
];

export default eslintConfig;
