const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
module.exports = {
  env: {
    API_URL: '  http://localhost:3000',
  },
  nextConfig,
};
