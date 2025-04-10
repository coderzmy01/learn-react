/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F5F5',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
        },
        secondary: '#64748B',
        tertiary: '#94A3B8',
        accent: '#F87171',
        'accent-hover': '#EF4444',
        'accent-active': '#DC2626',
        'accent-disabled': '#EF4444',
        'accent-disabled-hover': '#EF4444',
        'accent-disabled-active': '#EF4444',
      },
    },
  },
  plugins: [],
};
