import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Background, BackgroundProps } from '@src/components/Background';

// eslint-disable-next-line import/no-default-export
export default {
  component: Background,
  title: 'Components/Divider',
} as Meta;

export const Basic = (args: BackgroundProps) => {
  return <Background {...args} />;
};

Basic.storyName = 'Background';
