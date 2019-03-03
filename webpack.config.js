const path = require("path");
const paths = require("./paths");

module.exports = {
  entry: "./src/lib/index.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".mjs", ".web.js", ".js", ".json", ".web.jsx", ".jsx"],
    modules: [paths.appSrc, "node_modules"],
    alias: {
      Lib: path.resolve(paths.appSrc, "lib/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      }
    ]
  }
};
