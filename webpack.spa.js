const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base.js');
const optimizationConfig = require('./webpack.optimization.js');

const config = {
  entry: {
    main: './src/index.jsx',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico',
      filename: 'index.html',
      template: './public/index.html',
    }),
    new CopyPlugin([
      { from: './web.config' },
      { from: './node_modules/tinymce/skins/ui/oxide', to: 'skins/oxide' },
    ]),
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
    if (env && env.NODE_PATH) {
      config.output = {
        ...config.output,
        path: env.NODE_PATH,
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
