const DEV = process.env.NODE_ENV !== 'production';
const HMR = false;

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {

  var config = {};

  config.context = __dirname;

  config.devtool = DEV ? "inline-sourcemap" : null;

  config.entry = {
    'js/bundle.js': './app/js/main.js',
    'css/bundle.css': './app/css/main.scss'
  };

  config.output = {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    publicPath: DEV ? 'http://localhost:8080/' : '/dist/'
  };

  config.module = {

    loaders: [

      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!resolve-url!sass?sourceMap'),
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        loader: 'css!postcss!resolve-url',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file',
        query: {
          name: 'img/[name].[ext]'
        }
      },

      {
        test: /\.woff(2)?(\?v=[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2})?$/,
        loader: "url",
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]'
        }
      },

      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2})?$/,
        loader: "file",
        query: {
          name: 'fonts/[name].[ext]'
        }
      },

      {
        test: /\.html$/,
        loader: 'raw'
      }

    ]

  };

  config.postcss = function() {
    return [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ];
  };

  config.plugins = [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.NoErrorsPlugin()
  ];

  if (!DEV) {

    config.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    );

  }

  if (DEV) {

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      inline: true
    };

    /**
     * Enable the HMR constant if you want to try HMR.
     * It enables the Webpack client to open a socket with the browser
     * and perform HMR on it.
     * I couldn't get this working properly due to the following error:
     *
     * [HMR] Cannot apply update.
     * [HMR] Aborted because 0 not accepted
     *
     * But I got no luck, no time and no need to get around this via
     * the webpack-hot-middleware. So, good luck and make a PR
     * or a comment if you made progress on this.
     */
    //
    if (HMR) {

      config.entry.devServerClient = 'webpack-dev-server/client?http://localhost:8080/';
      config.hotOnlyDevServer = 'webpack/hot/only-dev-server';

      config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
      );

      config.devServer.hot = true;

    }

  }

  return config;

}();
