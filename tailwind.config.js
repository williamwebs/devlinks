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
        primary: "#633CFF",
        dark: "#333333",
        red: "#FF3939",
        grey: "#737373",
        lightGrey: "#D9D9D9",
        white: "#FFFFFF",
        white2: "#FAFAFA",
        lightBlue: "#BEADFF",
        veryLightBlue: "#EFEBFF",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
        },
      },
    },
  },
  plugins: [],
};
