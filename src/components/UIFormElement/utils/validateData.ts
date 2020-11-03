import { v4 } from 'uuid';
import { validateEmail, validateUrl } from '../../utilities/helpers';
import { CompareArgs, CustomError } from '../@types';

const compareLength = (value: string | number, min: number, max: number): CustomError[] => {
  try {
    const hasMin = !!(min || min === 0);
    const hasMax = !!(max || max === 0);
    const errors = [];
    const stringifiedValue = value.toString();
    const valueLength = stringifiedValue.length;
    if (hasMin) {
      if (valueLength < min) {
        errors.push({
          id: v4(),
          value: `Количество введенных символов, меньше минимально допустимого! Минимум: ${min}.`,
        });
      }
    }
    if (hasMax) {
      if (valueLength > max) {
        errors.push({
          id: v4(),
          value: `Количество введенных символов, больше максимально допустимого! Максимум: ${max}.`,
        });
      }
    }
    return errors;
  } catch (e) {
    console.log('[UIFormElement] Error: ', e);
    return [];
  }
};

const compareInteger = (value: string | number, min: number, max: number): CustomError[] => {
  try {
    const hasMin = !!(min || min === 0);
    const hasMax = !!(max || max === 0);
    const errors = [];
    let numberifiedValue = value;
    if (typeof value === 'string') {
      numberifiedValue = parseInt(value, 10);
    }
    if (hasMin && numberifiedValue < min) {
      errors.push({ id: v4(), value: `Указанное значение, меньше минимально допустимого! Минимум: ${min}.` });
    }
    if (hasMax && numberifiedValue > max) {
      errors.push({ id: v4(), value: `Указанное значение, больше максимально допустимого! Максимум: ${max}.` });
    }
    return errors;
  } catch (e) {
    console.log('[UIInput] Error: ', e);
    return [];
  }
};

export default function validateData(value: CompareArgs): CustomError[] {
  const {
    data,
    required,
    minLength,
    maxLength,
    isInteger,
    minInteger,
    maxInteger,
    isEmail,
    isUrl,
    customValidation,
  } = value || {};
  let err = [];
  const isEmpty = !data && data !== 0;
  if (required) {
    if (isEmpty) {
      err.push({ id: v4(), value: 'Поле является обязательным, но не заполнено!' });
    }
  }
  if (!isEmpty) {
    if (!isInteger) {
      err = [...err, ...compareLength(data, minLength, maxLength)];
    }
    if (isInteger) {
      err = [...err, ...compareInteger(data, minInteger, maxInteger)];
    }
    if (isEmail) {
      if (!validateEmail(data)) {
        err.push({ id: v4(), value: 'Поле заполнено неверно! Пример верного формата: example@gmail.com' });
      }
    }
    if (isUrl) {
      if (!validateUrl(data)) {
        err.push({ id: v4(), value: 'Поле заполнено неверно! Пример верного формата: http://example.ru' });
      }
    }
    if (customValidation) {
      err = [...err, ...customValidation(data)];
    }
  }
  if (err && Array.isArray(err) && err.length > 0) {
    return err;
  }
  return null;
}
