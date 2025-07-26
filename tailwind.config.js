module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF7F50',
        beach: {
          sand: '#FFE4B5',
          wave1: '#00BFFF',
          wave2: '#1E90FF',
          wave3: '#20B2AA',
        },
      },
      animation: {
        'wave-border': 'wave 2s infinite linear',
        'sparkle': 'sparkle 1.5s infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'twinkle': 'twinkle 2s infinite ease-in-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { borderColor: '#00BFFF' },
          '25%': { borderColor: '#1E90FF' },
          '50%': { borderColor: '#20B2AA' },
          '75%': { borderColor: '#00BFFF' },
        },
        sparkle: {
          '0%, 100%': { boxShadow: '0 0 0 0 #FF7F50' },
          '50%': { boxShadow: '0 0 8px 4px #FF7F50' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.2 },
        },
      },
    },
  },
  plugins: [],
}; 