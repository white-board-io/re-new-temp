import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"` — the enquiry form posts to a Node route handler at
  // /api/enquiry, which a static export cannot serve. See
  // docs/adr/0002-full-static-export.md.
  allowedDevOrigins: ["192.168.18.157"],
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  reactCompiler: true,
};

export default nextConfig;
