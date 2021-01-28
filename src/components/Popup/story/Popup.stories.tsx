import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Popup, PopupProps } from '@src/components/Popup';

// eslint-disable-next-line import/no-default-export
export default {
  component: Popup,
  title: 'Components/Popup',
} as Meta;

export const Basic = (args: PopupProps) => {
  return <Popup {...args} />;
};

Basic.storyName = 'Popup';
