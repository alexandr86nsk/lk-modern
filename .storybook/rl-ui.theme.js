import { create } from '@storybook/theming/create';
import Logo from './assets/logo-storybook.png';

const pink = '#ea4c89';

export default create({
  base: 'light',

  colorPrimary: '#0062FF',
  colorSecondary: '#0062FF',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#d8d8d8',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#242424',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#242424',
  barSelectedColor: '#0062FF',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: '#d8d8d8',
  inputTextColor: '#242424',
  inputBorderRadius: 4,

  brandTitle: 'Real UI Storybook',
  brandUrl: 'https://example.com',
  brandImage: Logo,
});
