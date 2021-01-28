import { defaultValues } from '@src/constants';

export const emptyValueChecker = (value?: string | number | null) => {
  return !(value || value === defaultValues.ZERO);
};
