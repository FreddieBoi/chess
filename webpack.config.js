const path = require("path");

module.exports = {
  entry: "./src/ts/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".scss",
      ".css"
    ]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  }
};
