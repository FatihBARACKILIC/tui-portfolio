import { configs as astroConfigs } from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import core from "ultracite/eslint/core";

const tsEslintBlock = core.find(
  (entry) => Array.isArray(entry.files) && entry.files.includes("**/*.ts")
);

/**
@type {import("eslint").Linter.Config[]}
*/
export default [
  ...core,
  ...astroConfigs["flat/recommended"],
  ...(tsEslintBlock
    ? [
        {
          ...tsEslintBlock,
          files: ["**/*.tsx"],
          languageOptions: {
            ...tsEslintBlock.languageOptions,
            parser: tsParser,
            parserOptions: {
              ...tsEslintBlock.languageOptions?.parserOptions,
              ecmaFeatures: { jsx: true },
            },
          },
        },
      ]
    : []),
  {
    ignores: [
      ".astro/**",
      ".claude/**",
      ".cursor/**",
      ".vscode/**",
      "design/**",
      "dist/**",
      "package.json",
      "tsconfig.json",
    ],
  },
  {
    files: ["eslint.config.mjs"],
    rules: {
      "import-x/no-rename-default": "off",
      "sort-keys": "off",
    },
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
      complexity: ["error", { max: 25 }],
      "func-style": "off",
      "github/filenames-match-regex": "off",
      "no-magic-numbers": "off",
      // Base rule false-positives on callback param names in type positions
      "no-unused-vars": "off",
      "sonarjs/max-union-size": "off",
      "sonarjs/non-number-in-arithmetic-expression": "off",
      "sonarjs/no-unused-vars": "off",
      "sonarjs/null-dereference": "off",
      "sonarjs/values-not-convertible-to-numbers": "off",
      "sort-keys": "off",
      // Conflicts with arrow-body-style on multiline object returns
      "unicorn/consistent-arrow-return-style": "off",
      "unicorn/name-replacements": "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
