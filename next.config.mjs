/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['www.gutenberg.org'],
    unoptimized: true 
  },
};

export default nextConfig;
