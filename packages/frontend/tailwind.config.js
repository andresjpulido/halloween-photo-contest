/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#ea580c",
      secondary: "#99B865",
      tertiary: "#03080C",
      fourth: "#E6E6E6",
      fifth: "#111621",
      sixth: "#020306",
    },
    fontFamily: {
      HennyPennyRegular: [
        "HennyPennyRegular",
        "Helvetica",
        "ui-sans-serif",
        "system-ui",
      ],
      CreepsterRegular: [
        "CreepsterRegular",
        "Helvetica",
        "ui-sans-serif",
        "system-ui",
      ],
    },
  },
  plugins: [],
};
