/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        solmaBlue: '#0173E5',
        earthBrown: '#5C4033',
        deepCharcoal: '#1B1F23',
        warmOffWhite: '#F5F5F2',
        concreteGray: '#E9ECEF',
        textSecondary: '#5F6368',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        docMedia: '0 10px 30px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}