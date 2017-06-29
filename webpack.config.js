
var path = require("path");
module.exports = {
  context: __dirname,
  entry: "./frontend/invoke.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules\/(?!(wavesurfer|wavesurfer.js)\/).*/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: require.resolve("wavesurfer.js"),
        loader: "expose?WaveSurfer"
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
};
