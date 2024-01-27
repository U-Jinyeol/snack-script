/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/512/859/859354.png",
      },
    ],
  },
};

module.exports = nextConfig;
