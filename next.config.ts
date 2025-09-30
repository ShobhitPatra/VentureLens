import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds (not recommended)
  },
};

export default nextConfig;
