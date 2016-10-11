const DEV = process.env.NODE_ENV !== 'production';
const HMR = false;

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(){

  var config = {};

  config.context = __dirname;

  config.devtool = DEV ? "inline-sourcemap" : null;

  config.entry = {
    'js/bundle.js': './app/js/main.js',
    'css/bundle.css': './app/css/main.scss'
  };

  config.output = {
    path: './dist/',
    filename: '[name]',
    publicPath: DEV ? 'http://localhost:8080/' : path.join(__dirname, 'dist')
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
        loader: ExtractTextPlugin.extract('css!sass'),
        exclude: /node_modules/
      }
    ]

  };

  config.plugins = [
    new ExtractTextPlugin('css/bundle.css')
  ];

  if (DEV) {

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      inline: true
    };


    /**
     * Enable the HMR constant if you want to try HMR.
     * It enables the Webpack client to open a socket with the browser
     * and a performs HMR on it.
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
