import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
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
        darkPrimary: '#803805',
        darkPrimaryAccent: '#8A3C05',
        darkAccent: '#DEBF79',
        darkSecondary: '#444D5A',
        darkSecondaryAccent: '#4C505C',
        darkBackground: '#222222',
        text: '#222222',
        darkText: '#F5F5F5',
      },
    },
    fontFamily: {
      sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
} satisfies Config;
