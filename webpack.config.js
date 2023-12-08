const { resolve, join } = require("path");
const apiMocker = require("mocker-api");

module.exports = {
  devtool: "source-map",
  entry: resolve("./src/index.jsx"),
  output: {
    path: join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  devServer: {
    port: 8050,
    host: "0.0.0.0",
    contentBase: resolve("./src"),
    before: app => {
      apiMocker(app, resolve("./config/jest/mock-api.js"), {
        changeHost: true
      });
    }
  }
};
