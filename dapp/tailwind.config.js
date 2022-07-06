/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Press Start 2P"', ...fontFamily.sans],
        secondary: ['"Pixelated"'],
        special: ['"Inscryption"'],
      },
      colors: {
        body: '#f5f5f5',
        anakiwa: {
          50: '#eff8ff',
          100: '#daeeff',
          200: '#bee2ff',
          300: '#82cbff',
          400: '#5db7fd',
          500: '#3797fa',
          600: '#2179ef',
          700: '#1962dc',
          800: '#1b50b2',
          900: '#1c468c',
        },
        pattensBlue: {
          50: '#eff9ff',
          100: '#d6eeff',
          200: '#b8e6ff',
          300: '#79d2ff',
          400: '#32bcfe',
          500: '#07a5f0',
          600: '#0083ce',
          700: '#0069a6',
          800: '#035889',
          900: '#094971',
        },
        portafino: {
          50: '#fefee8',
          100: '#ffffb6',
          200: '#fffb88',
          300: '#fff244',
          400: '#fee211',
          500: '#eec904',
          600: '#cd9c01',
          700: '#a47004',
          800: '#87570c',
          900: '#734710',
        },
        success: {
          50: '#effef1',
          100: '#d6ffdb',
          200: '#b5fdbe',
          300: '#7cf98d',
          400: '#3cec55',
          500: '#13d42f',
          600: '#09b022',
          700: '#0b8a1e',
          800: '#0f6c1d',
          900: '#0e591b',
        },
        primary: {
          // Customize it on globals.css :root
          50: withOpacityValue('--tw-color-primary-50'),
          100: withOpacityValue('--tw-color-primary-100'),
          200: withOpacityValue('--tw-color-primary-200'),
          300: withOpacityValue('--tw-color-primary-300'),
          400: withOpacityValue('--tw-color-primary-400'),
          500: withOpacityValue('--tw-color-primary-500'),
          600: withOpacityValue('--tw-color-primary-600'),
          700: withOpacityValue('--tw-color-primary-700'),
          800: withOpacityValue('--tw-color-primary-800'),
          900: withOpacityValue('--tw-color-primary-900'),
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
