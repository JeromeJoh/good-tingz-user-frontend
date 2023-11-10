/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#2c2c2c",
        "white": "#f9f9f9",
        "primaryColor": "#decade",
        "blatantColor": "#904290",
        "darkerColor": "#a79ba7",
        "lighterColor": "#efdeef",
      },
      fontFamily: {
        "jost": "Jost",
        "quicksand": "Quicksand",
      },
      backgroundImage: {
      },
      transitionProperty: {
        hover: 'all .5s ease-in',
      },
      animation: {
        slideup: 'slideup .5s ease-in',
        slidedown: 'slidedown .5s ease-in-out',
        slideleft: 'slideleft .5s ease-in-out',
        slideright: 'slideright .5s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
  },
  plugins: [],
}