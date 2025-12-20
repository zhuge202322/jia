import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6620',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '45.145.229.20',
        port: '2025',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
