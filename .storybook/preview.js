import '@styles-kit/global.scss';
import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from '@storybook/addon-viewport';

export const parameters = {
  controls: { expanded: true },
  options: {
    storySort: {
      method: '',
      order: ['Documentation', 'Materials', 'Components'],
      locales: '',
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
