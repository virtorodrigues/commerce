/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.stripe.com'],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    runtime: 'edge',
  },
}

module.exports = nextConfig
