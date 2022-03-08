/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['assets.sorare.com'],
  },
  async rewrites() {
    return [
      {
          source: '/api/graphql',
          destination: 'https://api.sorare.com/graphql' // Proxy to Backend - https://nextjs.org/docs/api-reference/next.config.js/rewrites
        }
    ]
  }
}
