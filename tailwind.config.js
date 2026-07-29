/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Drop Yard
        asphalt: '#1c1b19',
        cinder: '#ede9e0',
        hazard: '#ff5a1f',
        steel: '#6b6b63',
        cream: '#f4f1ea',
        // P.R.O.
        'pro-red': '#b01e28',
        'pro-dark': '#8e1620',
        // The Nude Farmer
        'farm-green': '#46522f',
        'farm-dark': '#3a4326',
        'farm-cream': '#f1ead4',
        // Unpopular Demand
        'ud-gold': '#c9a24a',
        'ud-light': '#e7c873',
        'ud-cream': '#ece4cf',
        // Dead Air
        'da-navy': '#11111c',
        'da-cyan': '#2ee6d6',
        'da-pink': '#ff3d8d',
        'da-blue': '#dfe6f0',
      },
      fontFamily: {
        stencil: ['Big Shoulders Stencil', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
