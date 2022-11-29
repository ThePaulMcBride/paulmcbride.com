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
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.emerald.400"),
              "&:hover": {
                color: theme("colors.emerald.600"),
              },
              code: { color: theme("colors.emerald.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              th: {
                color: theme("colors.gray.100"),
              },
              borderBottomColor: theme("colors.gray.600"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
