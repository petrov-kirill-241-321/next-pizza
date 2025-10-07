import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.dodostatic.net"],
  },
};

export default nextConfig;
