import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0C10",
          900: "#12151C",
          800: "#1B1F29",
          700: "#262B38",
        },
        fog: "#9AA1B2",
        paper: "#F2F4F8",
        violet: {
          DEFAULT: "#6C5CE7",
          bright: "#8B7CF6",
        },
        cyan: {
          DEFAULT: "#22D3EE",
        },
        amber: {
          DEFAULT: "#F5B942",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(108,92,231,0.35), 0 0 40px -8px rgba(108,92,231,0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(108,92,231,0.20) 0%, rgba(10,12,16,0) 70%)",
        "accent-line":
          "linear-gradient(90deg, #6C5CE7 0%, #22D3EE 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "build-block": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 6s ease-in-out infinite",
        "build-block": "build-block 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
