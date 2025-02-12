import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        navy: {
          900: 'rgb(0 0 0 / 87%)',
          800: 'rgb(25 25 57)',
          700: 'rgb(44 40 82)',
          600: 'rgb(70 62 122)',
          500: 'rgb(151 137 205)',
          400: 'rgb(180 166 226)',
          300: 'rgb(204 191 247)',
          200: 'rgb(226 218 251)',
          100: 'rgb(242 240 251)'
        },
        sidebar: {
          DEFAULT: 'rgb(25, 25, 57)',
          foreground: 'rgb(242, 240, 251)',
          primary: 'rgb(226, 218, 251)',
          'primary-foreground': 'var(--rgb(25, 25, 57)',
          accent: 'rgb(44, 40, 82)',
          'accent-foreground': 'var(--rgb(242, 240, 251)',
          border: 'rgb(44, 40, 82)',
          ring: 'rgb(180, 166, 226)'
        }
      }
    }
  },
  plugins: [animate]
} satisfies Config;
