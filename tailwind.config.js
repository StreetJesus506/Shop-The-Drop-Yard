/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        asphalt: '#1c1b19',
        cinder: '#ede9e0',
        hazard: '#ff5a1f',
        steel: '#a3a39c',
        cream: '#f4f1ea',
        'pro-red': '#b01e28',
        'pro-dark': '#8e1620',
        'farm-green': '#46522f',
        'farm-dark': '#3a4326',
        'farm-cream': '#f1ead4',
        'ud-gold': '#c9a24a',
        'ud-light': '#e7c873',
        'ud-cream': '#ece4cf',
        'da-navy': '#11111c',
        'da-cyan': '#2ee6d6',
        'da-pink': '#ff3d8d',
        'da-blue': '#dfe6f0',
      },
      fontFamily: {
        stencil: ['var(--font-stencil)', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
