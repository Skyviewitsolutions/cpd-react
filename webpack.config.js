
module.exports = {
  // other configuration options...

  plugins: [
    webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};


