/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "37.5rem", // 600px
    },
    container: {
      center: true,
      screens: {
        sm: "37.5rem", // 600px
      },
      padding: {
        DEFAULT: "1rem",
        sm: "0",
      },
    },
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "light-very-light-gray": "hsl(0, 0%, 98%)",
        "light-very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "light-light-grayish-blue": "hsl(233, 11%, 84%)",
        "light-dark-grayish-blue": "hsl(236, 9%, 61%)",
        "light-very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        "dark-very-dark-blue": "hsl(235, 21%, 11%)",
        "dark-very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "dark-light-grayish-blue": "hsl(234, 39%, 85%)",
        "dark-light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-dark-grayish-blue": "hsl(234, 11%, 52%)",
        "dark-very-dark-grayish-blue": "hsl(233, 14%, 35%)",
        "dark-very-dark-grayish-blue": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
