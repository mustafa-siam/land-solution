/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ], // Add your Cloudinary hostname here
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
