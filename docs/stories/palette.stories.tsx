import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Colors } from '@src/components/Storybook/Colors';

// eslint-disable-next-line import/no-default-export
export default {
  component: Colors,
  title: 'Palette/Colors',
} as Meta;

export const Basic = () => {
  return <Colors />;
};

Basic.storyName = 'Colors';
