module.exports = {
  resolve: {
    fallback: { url: require.resolve("url/") },
  },
  rules: [
    {
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader"],
    },
  ],
};
