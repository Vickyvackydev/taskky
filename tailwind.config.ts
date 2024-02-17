/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text_black: "#26282C",
        text_gray: "#3A3F51",
        border_color: "#EDF2F7",
        backgrd: "#FAFAFA",
      },
      backgroundImage: {
        gif: "url('/gif.gif')",
      },
      screens: {
        lg: "1250px",
        sm: "768px",
        xs: "400px",
        xxs: "200px",
      },
      maxWidth: {
        "10xl": "1680px",
      },
    },
  },
  plugins: [],
};
