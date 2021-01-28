import { CustomError } from '../types';
import { v4 } from 'uuid';
import { isDefined, isNotEmptyArray, validateEmail, validateUrl } from '@src/utils';
import { compareInteger, compareLength } from './compare';

export type ValidatePropsType = {
  minLength?: number;
  maxLength?: number;
  value: string | number;
  isEmail?: boolean;
  isUrl?: boolean;
  isInteger?: boolean;
  required?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => CustomError[];
};

export function validate({
  value,
  required,
  minLength,
  maxLength,
  isInteger,
  minInteger,
  maxInteger,
  isEmail,
  isUrl,
  customValidation,
}: ValidatePropsType): CustomError[] | null {
  let err = [];
  if (required && !isDefined(value)) {
    err.push({ id: v4(), value: 'Поле является обязательным, но не заполнено!' });
  }
  if (isDefined(value)) {
    if (!isInteger) {
      err = [...err, ...compareLength(value, minLength, maxLength)];
    }
    if (isInteger) {
      err = [...err, ...compareInteger(value, minInteger, maxInteger)];
    }
    if (isEmail) {
      if (!validateEmail(value.toString())) {
        err.push({
          id: v4(),
          value: 'Поле заполнено неверно! Пример верного формата: example@gmail.com',
        });
      }
    }
    if (isUrl) {
      if (!validateUrl(value.toString())) {
        err.push({
          id: v4(),
          value: 'Поле заполнено неверно! Пример верного формата: http://example.ru',
        });
      }
    }
    if (customValidation) {
      err = [...err, ...customValidation(value)];
    }
  }
  if (isNotEmptyArray(err)) {
    return err;
  }
  return null;
}
