const extendWebpackConfig = require('./extendWebpackConfig');

module.exports = {
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  stories: [
    '../docs/*.stories.mdx',
    '../docs/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: extendWebpackConfig,
};
