/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  expireTime: 3600,
  rewrites() {
    return [
      {
        source: "/proxy/js/script.js",
        destination: "https://plausible.io/js/script.js",
      },
      {
        source: "/proxy/api/event",
        destination: "https://plausible.io/api/event",
      },
      {
        source: "/js/script.js",
        destination: "https://plausible.io/js/script.js",
      },
      {
        source: "/api/event",
        destination: "https://plausible.io/api/event",
      },
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
};

module.exports = nextConfig;
