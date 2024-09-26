/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customSlate: {
          light: '#f1f5f9', 
          DEFAULT: '#64748b', 
        },
        Emerald: {
          DEFAULT: '#24b57e', 
        },
        Indigo: {
          DEFAULT: '#07ab67', 
        },
        customGray: {
          DEFAULT: '#374151', 
        },
        Zinc: {
          DEFAULT: '#111827', 
        },
      },
      
    },
  },
  plugins: [],
}

