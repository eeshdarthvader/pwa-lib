const path = require("path");
const paths = require("./paths");

module.exports = {
  entry: "./src/lib/index.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist"),
    library: "pwa-lib",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: [".mjs", ".web.js", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      Lib: path.resolve(paths.appSrc, "lib/"),
      Utils: path.resolve(paths.appSrc, "utils/"),
      Constants: path.resolve(paths.appSrc, "constants/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
