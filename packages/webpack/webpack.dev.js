const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.base");

module.exports = merge(common, {
  mode: "development",
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  devServer: {
    open: false,
    hot: true,
    host: "localhost",
    port: 9000
  },
  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              // modules: true,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
        ],
        include: /\.module\.css$/i,
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          "style-loader",
          // 'css-loader',
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
        ],
        exclude: /\.module\.css$/i,
      },
    ],
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    new HtmlWebpackPlugin(),
  ]
});