/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tourdeapp.cz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
