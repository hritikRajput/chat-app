/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "royal-purple": "#7754b2",
        "midnight-black": "#1d1b2e",
        "slate-gray": "#343142",
        "pearl-white": "#eeeff6",
      },
    },
  },
  plugins: [],
};
