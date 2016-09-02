const fs      = require('fs');
const webpack = require('webpack');

const HOST = '0.0.0.0';
const PORT = 3000;

module.exports = {
  entry: [
    'babel-polyfill',
    './example/index.jsx',
  ],

  output: {
    publicPath: `http://${HOST}:${PORT}/`,
    filename: './example/js/[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: JSON.parse(fs.readFileSync('.babelrc')),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [ 'css-object' ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],

  resolve: {
    root: __dirname,
    alias: {
      'react-media-slider': 'dist'
    },
    extensions: [ '', '.js', '.jsx', '.css' ]
  },

  devtool: 'inline-source-map',
};