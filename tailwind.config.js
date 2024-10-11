/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',  // Google's primary blue color for Flights
        secondary: '#F1F3F4',  // Light gray for backgrounds
        accent: '#E53935',  // Accent color for actions (like booking buttons)
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  // sans-serif font like Google
      },
      screens: {
        'xs': '475px',  // Custom breakpoint for small devices
        'sm': '640px',  // Tailwind default: Small devices (like phones)
        'md': '768px',  // Tailwind default: Tablets
        'lg': '1024px',  // Tailwind default: Desktops
        'xl': '1280px',  // Large screens
        '2xl': '1536px',  // Extra large screens
      },
    },
  },
  plugins: [],
}