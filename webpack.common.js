const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

   plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    ...(isProduction ? [new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
  })] : []),
  ],

  module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        isProduction ? {
          loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          } : null,
        'sass-loader',

      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.hbs$/,
      use: ['handlebars-loader'],
      exclude: /(node_modules)/,
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
      type: 'asset/inline',
    },

  ],

  },
};
