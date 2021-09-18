'use strict';
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const CONTEXT_PATH = path.resolve(__dirname);
const DIST_PATH = `${CONTEXT_PATH}/dist/example/`;
const SRC_PATH = `${CONTEXT_PATH}/src`;

module.exports = {
  mode: 'development',
  context: CONTEXT_PATH,
  entry: [
    `${SRC_PATH}/ts/framework/example.ts`
  ],
  output: {
    publicPath: '/',
    path: DIST_PATH,
    filename: 'bundle.min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader'}
    ]
  },
  optimization: {
    // minimizer: [new UglifyJsPlugin()],
    minimize: false
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '9000',
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/ts/framework/example.html`
    })
  ]
};
