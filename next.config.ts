import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dashboard", destination: "/knowledge", permanent: false },
      { source: "/dashboard/:path*", destination: "/knowledge", permanent: false },
    ];
  },
};

export default nextConfig;
