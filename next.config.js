const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()(
  withContentlayer({
    reactStrictMode: true,
    rewrites() {
      return [
        {
          source: "/feed",
          destination: "/api/feed/rss",
        },
      ];
    },
  })
);

module.exports = nextConfig;
