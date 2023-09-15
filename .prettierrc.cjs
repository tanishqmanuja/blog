/** @type {import("prettier").Config} */
const config = {
  arrowParens: "avoid",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

module.exports = config;
