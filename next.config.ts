import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  /* config options here */
  output: isStaticExport ? "export" : undefined,
  basePath: process.env.NODE_ENV === "production" ? process.env.BASE_PATH || "" : "",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;