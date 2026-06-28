import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#080a0f",
        panel: "#10131a",
        "panel-soft": "#151924",
        border: "#262b36",
        ink: "#f4f7fb",
        muted: "#9aa4b2",
        brand: "#38bdf8",
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#fb7185"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56, 189, 248, 0.12), 0 18px 60px rgba(0, 0, 0, 0.38)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
