/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.stripe.com'],
  },
  experimental: {
    serverActions: true,
  },
  runtime: 'edge', // for Edge API Routes only
}

module.exports = nextConfig
