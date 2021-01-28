import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Icons } from '@components/Storybook/Icons';

// eslint-disable-next-line import/no-default-export
export default {
  component: Icons,
  title: 'Palette/Icons',
} as Meta;

export const Basic = () => {
  return <Icons />;
};

Basic.storyName = 'Icons';

Basic.parameters = {
  controls: { hideNoControlsWarning: true },
};
