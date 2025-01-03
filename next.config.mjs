/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.buymeacoffee.com',
            port: '',
            pathname: '/buttons/v2/**',
          }
      ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
