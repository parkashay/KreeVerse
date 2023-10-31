const colors = require('tailwindcss/colors');
const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');

module.exports = {
  presets: [tailwindConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@storefront-ui/react/**/*.{js,mjs}',
  ],
  // content: ["./app/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  important: '#app',

  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.sky,
        text: 'white',
      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};
