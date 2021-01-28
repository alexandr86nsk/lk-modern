import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Logo, LogoProps } from '@src/components/Logo';

// eslint-disable-next-line import/no-default-export
export default {
  component: Logo,
  title: 'Components/Logo',
} as Meta;

// Basic
export const Basic = (args: LogoProps) => {
  return <Logo {...args} />;
};

Basic.storyName = 'Logo';
