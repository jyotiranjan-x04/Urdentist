import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: "#FEFBF5",
        sand: "#F0E9DC",
        cream: "#F7F0E6",
        gold: "#C9A96E",
        espresso: "#2C2416",
        muted: "#8A7F72",
        trust: "#3D7A6E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        accent: ["var(--font-display)", "Georgia", "serif"],
        quote: ["var(--font-quote)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(44,36,22,0.06)",
        "card-lg": "0 8px 40px rgba(44,36,22,0.10)",
        float: "0 2px 12px rgba(44,36,22,0.08)",
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
