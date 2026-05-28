import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7E5BFF',
          accent: '#FEA971',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        brand: '12px',
      },
      boxShadow: {
        brand: '0 2px 6px rgba(0,0,0,0.15)',
      },
      transitionDuration: {
        brand: '150ms',
      },
      transitionTimingFunction: {
        brand: 'ease-out',
      },
    },
  },
  plugins: [],
}

export default config
