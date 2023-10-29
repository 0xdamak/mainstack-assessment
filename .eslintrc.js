module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "standard-with-typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],

  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/triple-slash-reference": "off",
  },
  ignorePatterns: [".eslintrc.js", "next.config.js", "postcss.config.js"],
};
