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
    domains: ['res.cloudinary.com','images.unsplash.com','plus.unsplash.com'], // Add Cloudinary domain to allowed list
  },
};

export default nextConfig;
