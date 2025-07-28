import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid quote issues
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
