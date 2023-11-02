import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      maxWidth: {
        xxs: "17rem",
      },
      fontSize: {
        "2.5xl": "1.75rem",
      },
      fontFamily: {
        TomatoGrotesk: ["TomatoGrotesk", "Arial", "sans-serif", "system-ui"],
      },
      borderRadius: {
        "2.5xl": "1.25rem;",
        "7xl": "6.25rem;",
      },
      colors: {
        "gray-50": "#EFF1F6",
        "gray-400": "#56616B",
        "black-300": "#131316",
        "jade-100": "#E3FCF2",
        "jade-400": "#0EA163",
        "yellow-400": "#A77A07",
        "red-100": "#F9E3E0",
      },
      boxShadow: {
        nav: "0px 2px 4px 0px rgba(45, 59, 67, 0.05), 0px 2px 6px 0px rgba(45, 59, 67, 0.06)",
        "quick-action":
          "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
