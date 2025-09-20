/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if your files live elsewhere
  ],
  theme: {
    extend: {
      keyframes: {
        slideInBlur: {
          '0%': { transform: 'translateX(-50px)', filter: 'blur(10px)', opacity: '0' },
          '60%': { transform: 'translateX(10px)', filter: 'blur(3px)', opacity: '0.7' },
          '100%': { transform: 'translateX(0)', filter: 'blur(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-blur': 'slideInBlur 1.2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
