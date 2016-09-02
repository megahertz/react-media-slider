const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    filename: './dist/index.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015', 'stage-0' ],
          plugins: [ 'transform-class-properties' ]
        },
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
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  resolve: {
    extensions: [ '', '.json', '.js', '.jsx', '.css' ]
  },

  exclude: './node_modules'
};