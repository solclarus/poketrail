import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
 
    return config;
  },
  images: { remotePatterns: [{
    protocol: 'https',
    hostname: 'raw.githubusercontent.com',
  }, {
    protocol: 'https',
    hostname: 'pokeapi.co',
  },]}
};

export default nextConfig;
