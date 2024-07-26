/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            main: "#FFFFFF",
            back: "#F4F4F4",
            orange: "#E79A82",
            green: "#9EAB71",
            yellow: "#E7D582",
            pink: "#DFACD4",
            purple: "#B5B1E1"
        },
        boxShadow: {
          'custom': '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
        },
    },
},
  plugins: [],
}