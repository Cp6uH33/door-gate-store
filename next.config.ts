import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'http://195.35.49.191/wp-json/:path*',
        has: [
          {
            type: 'header',
            key: 'host',
          },
        ],
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/wp-json/:path*',
        headers: [
          { key: 'Host', value: 'doorgatesistem.com' },
        ],
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
        hostname: 'api.doorgatesistem.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};
export default nextConfig;
