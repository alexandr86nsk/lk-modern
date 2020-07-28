const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const optimizationConfig = require('./webpack.optimization.js');

const config = {
  entry: {
    main: './src/index.jsx',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    // noInfo: true,
    port: 9000,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico',
      filename: 'index.html',
      template: './public/index.html',
    }),
    // new CopyPlugin([{ from: './web.config' }]),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
    return merge(config, baseConfig(argv.mode === 'development'));
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
    return merge(config, baseConfig(argv.mode === 'development'), optimizationConfig);
  }

  return config;
};
