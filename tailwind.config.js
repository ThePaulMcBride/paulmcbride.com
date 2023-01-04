const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "emerald-opaque": "rgb(13 42 148 / 18%)",
      },
      fontFamily: {
        body: ["var(--font-lora)", ...fontFamily.serif],
        sans: ["IBM Plex Sans", ...fontFamily.sans],
        serif: ["var(--font-playfair-display)", ...fontFamily.serif],
      },
      fontSize: {
        jumbo: ["1.4rem", "1.92"],
      },
      gridTemplateColumns: {
        main: "1fr min(58ch, 100%) 1fr",
      },
      typography: (theme) => ({
        xl: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.emerald.500"),
              "&:hover": {
                color: theme("colors.emerald.700"),
              },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
              color: theme("colors.gray.700"),
            },
            thead: {
              borderBottomColor: theme("colors.gray.200"),
            },
            code: {
              color: theme("colors.pink.500"),
              "&:before": {
                content: "none",
              },
              "&:after": {
                content: "none",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
