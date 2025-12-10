import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    // buildActivity: false, // Not supported in this version's types
    // appIsrStatus: false,
    position: "bottom-left",
  },
};

export default nextConfig;
