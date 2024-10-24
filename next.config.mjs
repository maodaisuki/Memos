/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http" || "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
