const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = {
  images: {
    domains: ['https://next-lime-delta.vercel.app'],
  },
  env: {
    API_URL: 'https://next-lime-delta.vercel.app',
  },
  ...nextConfig,
};
