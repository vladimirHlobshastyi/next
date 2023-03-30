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
    /* "http://localhost:3001", */
    API_URL:
      /*  "http://localhost:3000"  */
      "https://backend-for-next.vercel.app",
    /*  "https://next-lime-delta.vercel.app", */
  },
};
