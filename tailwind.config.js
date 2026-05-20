/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm)", "system-ui", "sans-serif"], // default
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        forest: {
          DEFAULT: "#1B4332",
          mid: "#2D6A4F",
          light: "#40916C",
        },
        mint: {
          DEFAULT: "#95D5B2",
          light: "#D8F3DC",
        },
        gold: "#D4A017",
        "off-white": "#F7FAF8",
        charcoal: "#1A1A2E",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "forest-sm": "0 4px 16px rgba(27,67,50,0.10)",
        "forest-md": "0 8px 24px rgba(27,67,50,0.14)",
        "forest-lg": "0 16px 40px rgba(27,67,50,0.18)",
      },
    },
  },
  plugins: [],
};