/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["dweb.link"],
  },
};

module.exports = nextConfig;
