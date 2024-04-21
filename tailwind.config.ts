import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /(bg|text|border)-(high|fixed|low)-(400|500|600|700|800)/ },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        high: colors.green,
        fixed: colors.slate,
        low: colors.red,
      },
    },
  },
  plugins: [],
};
export default config;
