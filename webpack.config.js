const fs      = require('fs');
const webpack = require('webpack');

const HOST = '0.0.0.0';
const PORT = 3000;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './example/index.jsx',
  ],

  output: {
    publicPath: `http://${HOST}:${PORT}/`,
    filename: '/js/[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot',
        exclude: /node_modules/
      },
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

  resolve: {
    root: __dirname,
    alias: {
      'react-media-slider': 'dist'
    },
    extensions: [ '', '.js', '.jsx', '.css' ]
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './example',
    hot: true,
    historyApiFallback: false,
    stats: { colors: true },
    host: HOST,
    port: PORT,
    open: `http://${HOST}:${PORT}`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ]
};