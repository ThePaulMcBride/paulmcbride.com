const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()(
  withContentlayer({
    reactStrictMode: true,
    images: {
      domains: ["cdn.sanity.io"],
    },
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
