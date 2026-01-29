/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'code-green': '#00ff41',
          'dark-bg': '#0a0a0a',
        },
      },
    },
    plugins: [],
  }