import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#737373',
          lighter: '#F5F5F5',
        },
        background: {
          DEFAULT: 'var(--background)',
          light: 'var(--background)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
        },
        common: {
          light: '#ffffff',
          dark: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
