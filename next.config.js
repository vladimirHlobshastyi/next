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
      /* "https://next-lime-delta.vercel.app" */ "https://backend-for-next.vercel.app/",
  },
};
