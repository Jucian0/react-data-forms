const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './components/**/*.{js,tsx}',
    './nextra-theme-docs/**/*.{js,tsx}',
    './pages/**/*.{md,mdx,tsx}',
    './theme.config.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`"Inter"`, 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'monospace'],
        mono: [
          'Menlo',
          'Monaco',
          'Lucida Console',
          'Liberation Mono',
          'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        dark: '#0B132B',
        brandLight: '#CCFFF7',
        brandDark: '#00342D',
        gray: colors.neutral,
        blue: colors.blue,
        orange: colors.orange,
        green: colors.green,
        red: colors.red,
        yellow: colors.yellow,
        brand: '#2ec4b6',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        betterhover: { raw: '(hover: hover)' },
      },
    },
  },
  darkMode: 'class',
};
