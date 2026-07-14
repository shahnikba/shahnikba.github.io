import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build; GitHub Pages serves out/ as-is.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
