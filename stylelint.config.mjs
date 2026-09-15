/**
@type {import("stylelint").Config}
*/
export default {
  extends: ["ultracite/stylelint"],
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
