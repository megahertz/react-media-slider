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

  resolve: {
    extensions: [ '', '.json', '.js', '.jsx', '.css' ]
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