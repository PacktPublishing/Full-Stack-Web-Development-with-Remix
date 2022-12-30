/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FBBF24',
        primaryAccent: '#F59E0B',
        accent: '#222222',
        secondary: '#C4C4C4',
        secondaryAccent: '#9CA3AF',
        background: '#F5F5F5',
        backgroundPrimary: '#FFFFFF',
        darkPrimary: '#803805',
        darkPrimaryAccent: '#8A3C05',
        darkAccent: '#DEBF79',
        darkSecondary: '#444D5A',
        darkSecondaryAccent: '#4C505C',
        darkBackground: '#222222',
        darkBackgroundPrimary: '#1F1F1F',
        darkShadow: '#000000',
        text: '#222222',
        darkText: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
