const path = require("path");
const webpack = require("webpack");
const moment = require("moment");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

moment().format();
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body"
});


module.exports = {
  target: "web",
  devServer: {
    port: 5000,
    contentBase: "./dist",
    historyApiFallback: true
  },
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"] // we use this to transpile es6 code on the web
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "styles.css"
    }),
    HtmlWebpackPluginConfig,
    new webpack.NoEmitOnErrorsPlugin()
  ],
  mode: "production",
  externals: {
    // global app config object
    config: JSON.stringify({
      // apiUrl: "https://ry9c19b06b.execute-api.us-east-1.amazonaws.com/dev/api/v1"
      apiUrl: "http://localhost:8000/api/v1"
    })
  }
};
