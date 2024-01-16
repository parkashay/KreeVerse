// tailwind.config.js
const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@storefront-ui/react/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          'linear-gradient(90deg, rgba(226,220,20,1) 0%, rgba(96,181,56,1) 27%, rgba(44,189,119,1) 75%, rgba(0,212,255,1) 100%)',
      },
    },
  },
  plugins: [],
};
