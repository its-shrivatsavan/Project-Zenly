const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", // or "development" depending on your use case
  entry: "./src/popup.jsx", // entry point of your extension
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "popup.js", // this will be included in popup.html
    clean: true, // cleans old dist files on each build
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // supports .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // allows imports without file extensions
  },
  plugins: [
    // Injects output JS into popup.html template
    new HtmlWebpackPlugin({
      template: "public/popup.html",
      filename: "popup.html",
    }),

    // Copies manifest.json and icons to dist/
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "icons" }, // ensure icons exist at public/icons
      ],
    }),
  ],
};
