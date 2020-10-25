const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');
const optimizationConfig = require('./webpack.optimization');

const config = {
  entry: {
    main: path.resolve(__dirname, '../src/index.jsx'),
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    compress: true,
    hot: true,
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Real App',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, '../web.config') },
        { from: path.resolve(__dirname, '../node_modules/tinymce/skins/ui/oxide'), to: 'skins/oxide' },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
    config.plugins.push(new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify('false'),
    }));
    config.plugins.push(new BundleAnalyzerPlugin());
    return merge(config, baseConfig(argv.mode === 'development'));
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
    const { NODE_PATH } = env || {};
    if (NODE_PATH) {
      config.output = {
        ...config.output,
        path: NODE_PATH,
      };
      config.plugins.push(new webpack.DefinePlugin({
        SERVER_URL: JSON.stringify('true'),
      }));
    }
    config.plugins.push(new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify('false'),
    }));
    return merge(config, baseConfig(argv.mode === 'development'), optimizationConfig);
  }

  return config;
};
