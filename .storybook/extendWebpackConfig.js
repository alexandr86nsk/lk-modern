const path = require('path');

/**
 * Функция расширяет конфиг Storybook
 */
function extendWebpackConfig(config) {
  // у Storybook свои правила по обработке svg, надо их отключить
  const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
  fileLoaderRule.exclude = /\.svg$/;
  config.resolve.alias = {
    ...config.resolve.alias,
    '@assets': path.resolve(__dirname, '..', 'assets'),
    '@src': path.resolve(__dirname, '..', 'src'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@models': path.resolve(__dirname, '..', 'src/models'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@services': path.resolve(__dirname, '..', 'src/services'),
    '@mocks': path.resolve(__dirname, '..', 'src/__mocks__'),
    '@styles-kit': path.resolve(__dirname, '..', 'src/styles-kit'),
  };

  config.resolve.extensions = ['.tsx', '.ts', '.svg', '.scss', '.mjs', '.js', '.jsx', '.json'];

  config.module.rules = config.module.rules.concat([
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
      test: /\.scss$/,
      use: [
        'style-loader',
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
  ]);

  // Find the only Storybook webpack rule that tests for css
  const cssRule = config.module.rules.find((rule) => 'test.css'.match(rule.test));
  // Which loader in this rule mentions the custom Storybook postcss-loader?
  const loaderIndex = cssRule.use.findIndex((loader) => {
    // Loaders can be strings or objects
    const loaderString = typeof loader === 'string' ? loader : loader.loader;
    // Find the first mention of "postcss-loader", it may be in a string like:
    // "@storybook/core/node_modules/postcss-loader"
    return loaderString.includes('postcss-loader');
  });
  // Simple loader string form, removes the obsolete "options" key
  cssRule.use[loaderIndex] = 'postcss-loader';

  return config;
}

module.exports = extendWebpackConfig;
