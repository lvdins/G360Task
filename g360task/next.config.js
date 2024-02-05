/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.giraffe360.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "floorplans.giraffe360.com",
        port: "",
        pathname: "/demo/**",
      },
      {
        protocol: "https",
        hostname: "photos.giraffe360.com",
        port: "",
        pathname: "/demo/**",
      },
      {
        protocol: "https",
        hostname: "premium.giraffe360.com",
        port: "",
        pathname: "/demo/**",
      },
    ],
  },
};

module.exports = nextConfig;
