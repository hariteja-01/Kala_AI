/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 
                            (process.env.NODE_ENV === 'production' 
                              ? `http://localhost:${process.env.BACKEND_PORT || 8000}`
                              : 'http://localhost:8000'),
  },
  // Ensure standalone output for production
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

module.exports = nextConfig;
