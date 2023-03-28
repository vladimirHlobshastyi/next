const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
module.exports = nextConfig;
module.exports = {
  env: {
    API_URL:
      /*  "http://localhost:3000" */ /* "https://backend-for-next.vercel.app" */ /* "https://backend-for-next-4bvpt0ng3-vladimirhlobchastyi.vercel.app" */
      "https://next-lime-delta.vercel.app",
  },
};
