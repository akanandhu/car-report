import type { NextConfig } from "next";

const isMobileBuild = 
  process.env.CAP_TARGET || 
  process.env.BUILD_MOBILE === "true" || 
  process.env.EXPORT_STATIC === "true" ||
  process.argv.some(arg => arg.includes("android") || arg.includes("ios"));

const nextConfig: NextConfig = {
  ...(isMobileBuild ? { output: "export" } : {}),
  trailingSlash: true,
};

export default nextConfig;

