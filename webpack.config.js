
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
        test: require.resolve("wavesurfer.js"),
        loader: "expose?WaveSurfer"
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules\/(?!(wavesurfer|wavesurfer.js|react-wavesurfer)\/).*/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
};
