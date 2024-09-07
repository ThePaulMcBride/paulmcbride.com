import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: true },
  output: "server",
  integrations: [mdx(), tailwind(), react(), metaTags()],
  vite: {
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
