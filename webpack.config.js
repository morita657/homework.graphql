const path = require("path");

module.exports = {
  entry: [
    "webpack/hot/only-dev-server",
    `${path.resolve(__dirname, "index.jsx")}`,
  ],
  module: {
    loaders: [
      {
        loaders: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        exclude: /(node_modules)/,
        include: path.join(__dirname, "/"),
        loader: "babel-loader",
        query: {
          presets: ["react", "stage-2"],
        },
        test: /\.jsx?$/,
      },
    ],
  },
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  // plugins: [new OpenBrowserPlugin({ url: "http://localhost:8080" })],
  resolve: {
    extensions: [".webpack.js", ".js", ".jsx"],
  },
};
