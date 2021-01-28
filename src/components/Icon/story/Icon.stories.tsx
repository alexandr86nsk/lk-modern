import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Icon, IconProps } from '@src/components/Icon';

// eslint-disable-next-line import/no-default-export
export default {
  component: Icon,
  title: 'Components/Icon',
} as Meta;

// Basic
export const Basic = (args: IconProps) => {
  return <Icon {...args} />;
};

Basic.storyName = 'Icon';
