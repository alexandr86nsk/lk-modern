import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { TransitionEffect, TransitionEffectProps } from '@src/components/TransitionEffect';

// eslint-disable-next-line import/no-default-export
export default {
  component: TransitionEffect,
  title: 'Components/TransitionEffect',
} as Meta;

export const Basic = (args: Exclude<TransitionEffectProps, 'children'>) => {
  return <TransitionEffect {...args}>TransitionEffect</TransitionEffect>;
};

Basic.storyName = 'TransitionEffect';
