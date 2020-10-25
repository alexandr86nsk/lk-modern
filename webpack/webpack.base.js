const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (devMode) => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name][contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id][chunkhash].css',
      reloadAll: devMode,
    }),
  ],
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, '../semantic-ui/theme.config'),
      '../semantic-ui/site': path.join(__dirname, '../semantic-ui/site'),
    },
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
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
        },
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        include: /node_modules/,
        type: 'asset/inline',
      },
    ],
  },
});
