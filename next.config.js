/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
})

const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  swcMinify: false,
})

module.exports = nextConfig