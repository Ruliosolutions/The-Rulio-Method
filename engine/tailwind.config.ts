import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0c0c0e",
        foreground: "#f4f1ea",
      },
    },
  },
  plugins: [],
};
export default config;
