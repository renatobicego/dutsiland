/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    // Only match files ending in .glsl (not .glsl.js)
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });

    return config;
  },
};

module.exports = nextConfig;
