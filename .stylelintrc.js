module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
    'stylelint-config-recommended-scss',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {},
  ignoreFiles: [],
};
