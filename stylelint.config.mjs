/**
@type {import("stylelint").Config}
*/
export default {
  extends: ["ultracite/stylelint"],
  // Build output and generated types are not ours to lint; without this the
  // check and pre-commit hook fail on compiled CSS after any `astro build`.
  ignoreFiles: ["dist/**", ".astro/**", "node_modules/**"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "utility",
          "source",
          "plugin",
          "custom-variant",
          "variant",
          "apply",
          "reference",
        ],
      },
    ],
  },
};
