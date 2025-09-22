import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Increase body size limit for Server Actions (e.g., image uploads)
      bodySizeLimit: '20mb',
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', '127.0.0.1', 'localhost:4000', 'backend.nanasnoodlemart.com'],
  },
};

export default nextConfig;
