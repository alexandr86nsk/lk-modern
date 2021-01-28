import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Loader, LoaderProps } from '@src/components/Loader';

// eslint-disable-next-line import/no-default-export
export default {
  component: Loader,
  title: 'Components/Loader',
} as Meta;

export const Basic = (args: LoaderProps) => {
  return <Loader {...args} />;
};

Basic.storyName = 'Loader';
