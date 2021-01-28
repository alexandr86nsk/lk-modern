const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (env, argv) => {
  const { analyze } = env || {};
  const { mode } = argv || {};
  const isProduction = mode === 'production';

  const plugins = [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      title: 'Real App',
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ];

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name][contenthash].css',
        chunkFilename: 'css/[id][chunkhash].css',
      })
    );
  }

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    mode,
    target: 'web',
    entry: {
      main: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
      chunkFilename: isProduction ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      compress: true,
      open: true,
      hot: true,
      port: 9000,
    },
    devtool: isProduction ? undefined : 'inline-source-map',
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : undefined,
    resolve: {
      extensions: ['.tsx', '.ts', '.svg', '.scss', '.mjs', '.js', '.jsx', '.json'],
      alias: {
        '@assets': path.resolve(__dirname, 'assets'),
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@mocks': path.resolve(__dirname, 'src/__mocks__'),
        '@styles-kit': path.resolve(__dirname, 'src/styles-kit'),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx|js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.tsx|ts?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.less$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                @import "@styles-kit/constants/paths";
                @import "@styles-kit/constants/sizes";
                @import "@styles-kit/tools/mixins";
                @import "@styles-kit/tools/functions";
                `,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              issuer: /\.(sa|sc|c)ss$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'assets/[name].[ext]',
                  },
                },
              ],
            },
            {
              exclude: /node_modules/,
              issuer: /\.jsx|js|tsx|ts$/,
              use: [
                {
                  loader: 'babel-loader',
                },
                {
                  loader: 'react-svg-loader',
                  options: {
                    svgo: {
                      plugins: [{ removeTitle: false }],
                      floatPrecision: 2,
                    },
                    jsx: true,
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|ico|webp|webm)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
  };
};
