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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  resolve: {
    root: __dirname,
    alias: {
      'react-media-slider': 'src'
    },
    extensions: [ '', '.js', '.jsx', '.css' ]
  },
};