import core from "ultracite/eslint/core";
import astro from "ultracite/eslint/astro";

/**
@type {import("eslint").Linter.Config[]}
*/
export default [
  ...core,
  ...astro,
  {
    ignores: ["design/**"],
  },
  {
    files: ["src/lib/constants/**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
      "sort-keys": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Conflicts with arrow-body-style on multiline object returns
      "unicorn/consistent-arrow-return-style": "off",
    },
  },
];
