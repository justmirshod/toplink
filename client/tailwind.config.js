/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#5A32AE",
      },
      width: {
        "3/10": "30%",
      },
      padding: {
        1.5: "6px",
      },
    },
  },
  plugins: [],
};
