import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'static.remove.bg',
        pathname: '/sample-gallery/graphics/**',
      },
    ],
  },
};

export default nextConfig;
