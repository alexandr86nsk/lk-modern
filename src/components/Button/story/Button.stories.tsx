import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Button, ButtonProps } from '@src/components/Button';

// eslint-disable-next-line import/no-default-export
export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

export const Basic = (args: ButtonProps) => {
  return <Button {...args} />;
};

Basic.args = {
  text: 'Button',
};

Basic.storyName = 'Button';
