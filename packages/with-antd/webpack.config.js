/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');

const fs = require('fs');
const million = require('million/compiler');

const componentsDir = path.resolve(__dirname, 'src');
const entryPoints = {};

fs.readdirSync(componentsDir).forEach((file) => {
  const componentName = path.basename(file, path.extname(file));
  entryPoints[componentName] = path.join(componentsDir, file);
});

module.exports = {
  stats: 'minimal',
  mode: isProduction ? 'production' : 'development',
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      return chunkData.chunk.name === 'index' ? 'index.js' : '[name]/index.js';
    },
    library: {
      name: '@digi/components',
      type: 'umd',
    },
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: true,
    globalObject: 'this',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.wasm'],
    alias: {
      '@digi/components': path.resolve(__dirname, 'dist/index.d.ts'),
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|\.DS_Store$/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.worker\.(js|ts)$/,
        use: { loader: 'worker-loader' },
      },
      {
        test: /\.sharedworker\.(js|ts)$/,
        use: { loader: 'worker-loader', options: { workerType: 'SharedWorker' } },
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/sync',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /\.DS_Store$/,
    }),
    million.webpack({ auto: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.(css|js)$/,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
};
