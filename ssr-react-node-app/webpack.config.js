var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// https://medium.com/@phoebe.greig/headache-free-isomorphic-app-tutorial-react-js-react-router-node-js-ssr-with-state-and-es6-797a8d8e493a
// Lets create some file structure:
module.exports = {
  devtool: "inline-source-map",
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "react"]
          }
        },
        include: path.resolve(__dirname, "./app"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, './app/public/index.html'),
      inject: 'body'
    })
  ]
};
