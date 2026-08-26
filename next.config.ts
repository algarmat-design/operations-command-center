import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old dashboard route. Redirects are checked before the filesystem,
      // so this wins regardless of what else exists at that path.
      { source: "/workflow", destination: "/dashboards/executive", permanent: true },
    ];
  },
};

export default nextConfig;
