/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'lh3.googleusercontent.com', 'lh3.googleusercontent.com', 'https://imgur.com'],
  },
}

module.exports = nextConfig
