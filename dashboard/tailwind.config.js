/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#CC0000",
        "sidebar-light": "#F2F3F4",
        "matte-black": "#131313",
        "dark-sidebar": "#0F0F0F",
        "dark-border": "#2A2A2A",
        "dark-surface": "#1A1A1A",
      },
      fontFamily: {
        "display": ["Geist Sans", "Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
}

