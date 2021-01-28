import { PartialRecord } from '@src/types';
/**
 * Запрещает редактировать переданные props
 */

export function disableStoryControls<P>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modify: PartialRecord<keyof P, any>,
  args: Array<keyof Partial<P>>
) {
  args.forEach((arg) => {
    const argToModify = modify[arg];
    modify[arg] =
      argToModify && argToModify.control
        ? { ...argToModify, control: { ...argToModify.control, disable: true } }
        : { ...argToModify, control: { disable: true } };
  });
  return modify;
}
