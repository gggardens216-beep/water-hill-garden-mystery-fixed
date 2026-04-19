/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#265c3f',
        accent: '#f2b84b',
        mist: '#eef6f2',
        ink: '#1f2a23',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
}
