const { withUt } = require('uploadthing/tw');

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        DM: ['"DM Sans"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [],
});
