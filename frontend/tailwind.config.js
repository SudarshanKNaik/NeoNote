/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#13294B', // Dark Navy Blue - Sidebar Background
          light: '#1a3a6b',
          dark: '#0d1f3a',
        },
        gold: {
          DEFAULT: '#D4B44C', // Golden Mustard - Primary Buttons
          light: '#C59F3E', // Elegant Gold - Brand Title
          dark: '#b8942a',
        },
        cream: {
          DEFAULT: '#F9F7F2', // Soft Off-White - Body Background
          light: '#ffffff',
          dark: '#f5f3ed',
        },
        navy: {
          DEFAULT: '#13294B',
          light: '#1a3a6b',
          dark: '#0d1f3a',
        },
      },
      backgroundColor: {
        'body': '#F9F7F2',
        'sidebar': '#13294B',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

