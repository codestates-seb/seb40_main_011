/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      dropShadow: {
        productList: '-2px 10px 5px #A1A1A1',
        bestReviews: '0px -2px 5px #A1A1A1',
      },
      colors: {
        DMMainColor: '#343447',
        DMSubColor: '#23232F',
        DMThrColor: '#43435B',
        DMMainTextColor: '#545475',
        DMSubTextColor: '#3C3C55',
        DMThrTextColor: '#38384A',
        DMInputColor: '#121212',
        DMInputBorder: '#494C55',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
