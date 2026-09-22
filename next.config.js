/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: [
      'images-api.printify.com',
      'storage.googleapis.com',
    ],
  },
}

module.exports = nextConfig
