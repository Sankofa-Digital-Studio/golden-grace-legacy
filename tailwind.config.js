/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // We use amber-500 from default palette, so no need to override unless specific branding needed
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
  safelist: [
  // Authenticity helper components (Badge / InfoBlock / TruthBlock)
  {
    pattern: /(bg|text|border)-(amber|green|red)-500(\/10|\/20|\/30|\/40|\[0\.03\]|\[0\.02\])?/,
  },
],
};
