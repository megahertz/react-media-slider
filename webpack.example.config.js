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

  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],

  resolve: {
    extensions: [ '', '.json', '.js', '.jsx', '.css' ]
  },

  devtool: 'inline-source-map',
};