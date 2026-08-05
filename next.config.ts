import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export — see docs/adr/0002-full-static-export.md
  output: "export",
  allowedDevOrigins: ["192.168.18.157"],
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  reactCompiler: true,
};

export default nextConfig;
