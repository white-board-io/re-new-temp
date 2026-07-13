import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export — see docs/adr/0002-full-static-export.md
  output: "export",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
