import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Field, FieldProps } from '@components/Form/components/Field';

// eslint-disable-next-line import/no-default-export
export default {
  component: Field,
  title: 'Components/Field',
} as Meta;

export const Basic = (args: FieldProps) => {
  return <Field {...args} />;
};

Basic.storyName = 'Field';
