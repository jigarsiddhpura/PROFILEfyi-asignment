module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary' : '#6b21a8', // Tailwind's purple-800
          'secondary': '#9333ea', // Tailwind's purple-500
        }
      }
    },
  },
  plugins: [],
};
