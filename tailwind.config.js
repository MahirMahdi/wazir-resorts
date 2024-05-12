/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    darkTheme: false,
  },
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryButton: "#0766AD",
        containerColor: "#F3F3F3",
      },
      fontFamily: {
        dmSans: '"DM Sans", sans-serif',
        ptSerif: '"PT Serif", serif',
      },
    },
  },
  plugins: [require("daisyui")],
};
