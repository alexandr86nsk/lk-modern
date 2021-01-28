import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Overlay, OverlayProps } from '@src/components/Overlay';

// eslint-disable-next-line import/no-default-export
export default {
  component: Overlay,
  title: 'Components/Overlay',
} as Meta;

export const Basic = (args: Exclude<OverlayProps, 'children'>) => {
  return <Overlay {...args}>Overlay</Overlay>;
};

Basic.storyName = 'Overlay';
