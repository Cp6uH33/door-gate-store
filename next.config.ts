import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Stara lista proizvoda je uklonjena — prodavnica je na /shop
      { source: '/proizvodi', destination: '/shop', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/wp-content/:path*',
        destination: 'https://api.doorgatesistem.com/wp-content/:path*',
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
        hostname: 'api.doorgatesistem.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};
export default nextConfig;
