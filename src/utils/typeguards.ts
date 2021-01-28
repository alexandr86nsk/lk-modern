import { defaultValues } from '@src/constants';

// eslint-disable-next-line no-magic-numbers
export function isTruthy<T>(value: T): value is Exclude<T, undefined | null | 0 | false | ''> {
  return !!value;
}

export function isNotNil<T>(value: T): value is Exclude<T, undefined | null> {
  return value !== undefined && value !== null;
}

export function isDefined<T>(value: T): value is Exclude<T, undefined> {
  return value !== undefined;
}

export function isArray<T>(
  value: T
): value is Exclude<T, undefined | null | number | string | boolean> {
  return isTruthy(value) && Array.isArray(value);
}

export function isNotEmptyArray<T>(
  value: T
): value is Exclude<T, undefined | null | number | string | boolean> {
  return isTruthy(value) && Array.isArray(value) && value.length > defaultValues.ZERO;
}
