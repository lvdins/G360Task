import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#e2e8f0",
        highlight: "#edf2f7",
        muted: "#718096",
        dark: "#1a202c",
        light: "#f7fafc",
        white: "#ffffff",
        black: "#000000",
      },
      width: {
        inherit: "inherit",
      },
      animation: {
        appear: "rise 0.5s ease-in-out",
        fall: "fall 0.5s ease-in-out",
      },
      keyframes: {
        rise: {
          from: { transform: "translateY(0), translateX(-50%)", opacity: "0" },
          to: {
            transform: "translateY(-12px), translateX(-50%)",
            opacity: "1",
          },
        },
        fall: {
          from: { transform: "translateY(-12px)" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
