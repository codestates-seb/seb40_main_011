/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        productList: '-2px 10px 5px #A1A1A1',
        bestReviews: '0px -2px 5px #A1A1A1',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
