import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#334155",
        canvas: "#F8FAFC",
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        warning: "#F59E0B"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Poppins", "SF Pro Display", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "Poppins", "SF Pro Display", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
        lift: "0 28px 90px rgba(79, 70, 229, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
