const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: './script.js',
  },
  context: path.normalize(__dirname),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js?ver=[chunkhash]',
    // chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'bundles')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "modules")
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['syntax-dynamic-import'],
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true
    })
  ]
};