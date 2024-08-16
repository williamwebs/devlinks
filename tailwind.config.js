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
        bgGrey: "#EEEEEE",
        linkedin: "#2D68FF",
        facebook: "#2442AC",
        github: "#1A1A1A",
        twitter: "#43B7E9",
        youtube: "#EE3939",
        twitch: "#EE3FC8",
        devto: "#333333",
        codewars: "#8A1A50",
        freecodecamp: "#302267",
        gitlab: "#EB4925",
        hashnode: "#0330D1",
        stackoverflow: "#EC7100",
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
