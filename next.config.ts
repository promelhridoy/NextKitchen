import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "i.pravatar.cc" },
    {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
      protocol: "https",
      hostname: "i.ibb.co.com",
    },

    ],
  },
};

export default nextConfig;
