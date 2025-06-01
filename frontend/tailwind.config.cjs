// frontend/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: "#0a0e1a",
        secondary: "#1a2332",
        accent: "#6366f1",

        // Gaming‐specific colors
        highlight: "#f59e0b",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",

        // Surface & background
        surface: "#1e293b",
        surfaceLight: "#334155",
        cardBg: "#ffffff",
        cardBorder: "#e2e8f0",

        // Text colors
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        textDark: "#1e293b",

        // Special effects
        glow: "#8b5cf6",
        neon: "#06ffa5",
        gold: "#fbbf24",
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2d3748 100%)',
        'gradient-card':    'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-button':  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-gold':    'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      },
      boxShadow: {
        gaming:     '0 10px 25px -5px rgba(99, 102, 241, 0.3)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
        glow:       '0 0 20px rgba(139, 92, 246, 0.5)',
        neon:       '0 0 30px rgba(6, 255, 165, 0.4)',
      },
      animation: {
        'glow-pulse':      'glow-pulse 2s ease-in-out infinite alternate',
        'card-flip':       'card-flip 0.6s ease-in-out',
        'win-celebration': 'win-celebration 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
