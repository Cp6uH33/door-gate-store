import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'http://195.35.49.191/wp-json/:path*',
      },
      {
        source: '/wp-admin/:path*',
        destination: 'http://195.35.49.191/wp-admin/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doorgatesistem.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.doorgatesistem.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.doorgatesistem.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;