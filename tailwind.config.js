/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'xs': '280px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light']
  }
};
