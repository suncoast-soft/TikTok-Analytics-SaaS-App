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
          950: 'rgb(9 12 29)',
          900: 'rgb(17, 17, 42)',
          800: 'rgb(26 25 56)',
          700: 'rgb(44 40 82)',
          600: 'rgb(70 62 122)',
          500: 'rgb(120, 65, 238)',
          400: 'rgb(163, 126, 242)',
          300: 'rgb(151 137 205)',
          200: 'rgb(204 191 247)',
          100: 'rgb(226 218 251)',
          50: 'rgb(242 240 251)'
        },
        blue: '#5086FF',
        purple: '#853DFE',
        teal: '#5DBCB2',
        green: '#5CF07C',
        sidebar: {
          DEFAULT: 'rgb(17, 17, 42)',
          foreground: 'rgb(242, 240, 251)',
          primary: 'rgb(226, 218, 251)',
          'primary-foreground': 'var(--rgb(17, 17, 42)',
          accent: 'rgb(17, 17, 42)',
          'accent-foreground': 'var(--rgb(242, 240, 251)',
          border: 'rgb(17, 17, 42)',
          ring: 'rgb(180, 166, 226)'
        }
      },
      backgroundImage: {
        'custom-yellow':
          'linear-gradient(420deg, rgb(255, 206, 0) 0%, rgb(255, 206, 0) 33%, rgb(238, 175, 14) 33%, rgb(238, 175, 14) 100%)',
        'custom-yellow-hover':
          'linear-gradient(420deg, rgb(255, 206, 0) 0%, rgb(255, 206, 0) 66%, rgb(238, 175, 14) 66%, rgb(238, 175, 14) 100%)'
      },
      boxShadow: {
        'custom-box':
          'rgb(197, 106, 24) 0px -3px 0px 0px inset, rgb(255, 234, 47) 0px 2px 0px 0px inset',
        'custom-box-sink':
          'rgb(184 94 13) 0px -3px 0px 0px inset, rgb(255, 234, 47) 0px 2px 0px 0px inset'
      }
    }
  },
  plugins: [animate]
} satisfies Config;
