/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
