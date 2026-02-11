/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      
      screens: {
        xl: "1190px",
      },
    },

    extend: {
      colors: {
        page: "var(--color-page-bg)",
        text: {
          primary: "var(--color-text-primary)",
          blue: "var(--color-text-blue)",
          blue600: "var(--color-blue-600)",
        },
        blue: {
          300: "var(--color-blue-300)",
          600: "var(--color-blue-600)",
        },
        accent: {
          orange: "var(--color-accent-orange)",
        },
      },
      screens: {
        // example range breakpoint
        "md-max": { min: "768px", max: "930px" },
        "md-lg": { min: "931px", max: "1400px" },
      },

      boxShadow: {
        "soft-blue": "var(--shadow-soft-blue)",
        "input-inset": "var(--shadow-input-inset)",
        "box": "var(--shadow-box)"
      },

      backgroundImage: {
        "btn-orange": "var(--btn-orang-bg)",
        "btn-blue": "var(--btn-blue-bg)",
      },

      borderRadius: {
        pill: "9999px",
        card: "15px",
      },

      fontFamily: {
        pedya: ["var(--font-peyda)", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
};
