module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        display: ['"Fredoka One"', 'sans-serif'],
      },
      screens: {
        'media-hover': {
          raw: '(hover: hover)',
        },
      },
      boxShadow: {
        up: '0px -4px 16px -2px rgba(31, 41, 55, 0.2)',
      },
    },
  },
  plugins: [],
}
