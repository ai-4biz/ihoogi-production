/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          600: '#475569',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          500: '#10b981',
        },
        indigo: {
          500: '#6366f1',
        },
      },
    },
  },
  plugins: [],
}

