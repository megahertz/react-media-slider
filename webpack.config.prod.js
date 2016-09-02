const fs      = require('fs');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    library: 'react-media-slider',
    libraryTarget: 'umd',
    path: './dist',
    filename: 'index.js'
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

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],

  resolve: {
    extensions: [ '', '.js', '.jsx', '.css' ]
  }
};