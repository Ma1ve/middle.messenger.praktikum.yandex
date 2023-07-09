const { merge } = require("webpack-merge");
// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
    devServer: {
      compress: true,
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true,
  },
})
