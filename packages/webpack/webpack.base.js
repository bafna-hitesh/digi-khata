const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const paths = require("./paths");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [`${paths.src}/index.tsx`],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // ESLint configuration
    new ESLintPlugin({
      files: ["."],
      formatter: "table",
    }),
    // Puts variables in .env files into process.env
    new Dotenv(),

    // Prettier configuration
    // new PrettierPlugin(),
  ],
  resolve: {
    alias: {
      Assets: `${paths.src}/assets`,
      Components: `${paths.src}/components`,
      Containers: `${paths.src}/containers`,
      Utils: `${paths.src}/utils`,
      Hooks: `${paths.src}/hooks`,
      Providers: `${paths.src}/providers`,
    },
    symlinks: false,
    cacheWithContext: false,
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".mjs", ".css"],
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.(js|jsx|tsx|ts|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(?:ico|png|jpg|gif|jpeg|ttf)$/,
        type: "assets/resource",
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "assets/resource" },

      // Fonts and SVGs: Inline files
      // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'assets/inline' },
    ],
  },
};
