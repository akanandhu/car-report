import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 redirects: () => {
  return [
    {
      source: "/",
      destination: '/dashboard',
      permanent: false
    }
  ]
 }
};

export default nextConfig;
