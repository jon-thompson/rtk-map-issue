const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const env = process.env.NODE_ENV || "development"
const isProd = env === "production"

const OUTPUT_PATH = path.resolve(__dirname, "..", "public", "javascripts", "react")

const config = {
  context: __dirname,
  mode: env,
  devtool: isProd ? "source-map" : "eval-source-map",
  devServer: {
    port: 4000,
  },
  entry: {
    index: "./src/index.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: isProd ? "" : "/",
    // `hash` is unique for every build
    filename: isProd ? "[name]-[hash].js" : "[name].js",
    sourceMapFilename: isProd ? "[name]-[hash].js.map" : "[name].js.map",
  },
  optimization: isProd
    ? {
        splitChunks: {
          cacheGroups: {
            commons: {
              minChunks: Infinity,
              name: "commons",
              filename: "common.js",
            },
          },
        },
        minimizer: [new UglifyJsPlugin({ sourceMap: true })],
      }
    : {},
  plugins: isProd ? [] : [],
  module: {
    rules: [
      isProd
        ? {}
        : {
            enforce: "pre",
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            include: path.join(__dirname, "src"),
            options: {
              rules: {
                // allow during development, but remember to remove before you push
                "no-console": "off",
                "no-debugger": "off",
              },
              fix: true,
            },
          },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/env", "@babel/react"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-classes",
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
}

module.exports = config
