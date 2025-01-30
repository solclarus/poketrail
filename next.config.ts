import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
 
    return config;
  },
  images: {
    domains: ['raw.githubusercontent.com',"pokeapi.co",],
  },
};

export default nextConfig;
