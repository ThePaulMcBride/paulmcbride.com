import typography from "@tailwindcss/typography";
import { fontFamily, spacing } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "emerald-opaque": "rgb(13 42 148 / 18%)",
      },
      fontFamily: {
        body: ["'Lora Variable'", ...fontFamily.serif],
        sans: ["IBM Plex Sans", ...fontFamily.sans],
        serif: ["'Playfair Display Variable'", ...fontFamily.serif],
      },
      fontSize: {
        jumbo: ["1.4rem", "1.92"],
      },
      gridTemplateColumns: {
        main: "1fr min(58ch, 100%) 1fr",
      },
      maxWidth: {
        content: "58ch",
      },
      typography: (theme) => ({
        DEFAULT: {
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
              fontFamily: theme("var(--font-playfair-display)"),
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
  plugins: [typography],
};
