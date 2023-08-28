/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
"./pages/**/*.{js,ts,jsx,mdx}",
"./node_modules/flowbite/**/*.js",],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),],
  daisyui: {
    themes: ["autumn","light", "dark", "cupcake","garden","forest",],
  },
}

