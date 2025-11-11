const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()(
  withContentlayer({
    output: "standalone",
    reactStrictMode: true,
    rewrites() {
      return [
        {
          source: "/feed",
          destination: "/api/feed",
        },
        {
          source: "/sitemap.xml",
          destination: "/api/sitemap",
        },
      ];
    },
  })
);

module.exports = nextConfig;
