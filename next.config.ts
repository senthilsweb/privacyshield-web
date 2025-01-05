import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com','images.unsplash.com','plus.unsplash.com'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.iconify.design',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
