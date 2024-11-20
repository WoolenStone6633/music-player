import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-out': {
          '100%': { opacity: '0' }
        }
      },
      animation: {
        'fade-out': 'fade-out 0.15s linear'
      },
    },
  },
  plugins: [],
};
export default config;
