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
        primary: "#1a222e",
        secondary: "#FFC600",
        greytext: "#1A222E7A",
        grey: "#1A222EA3",
        white: "#ffffff",
        black: "#000000",
      },
      width: {
        inherit: "inherit",
      },
      animation: {
        appear: "rise 1.0s ease-in-out",
        fall: "fall 1.0s ease-in-out",
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
