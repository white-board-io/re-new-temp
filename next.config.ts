import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export — see docs/adr/0002-full-static-export.md
  output: "export",
  // Set DEV_ORIGIN to your LAN address to test on a phone; keeping it out of
  // the repo avoids committing internal network detail.
  // NOTE: security response headers cannot live here — `headers()` is not
  // supported under `output: "export"`. They are set in vercel.json.
  allowedDevOrigins: process.env.DEV_ORIGIN ? [process.env.DEV_ORIGIN] : [],
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  reactCompiler: true,
};

export default nextConfig;
