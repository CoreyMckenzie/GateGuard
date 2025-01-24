import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brdlzzxucjbcvetyfqpt.supabase.co',
      },
    ],
  },
};

export default nextConfig;
