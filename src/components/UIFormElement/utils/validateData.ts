import { v4 } from 'uuid';
import { validateEmail, validateUrl } from '../../utilities/helpers';

export type IErrors = {
  id: string;
  value: string;
};

export interface ICompareArgs {
  minLength?: number;
  maxLength?: number;
  data: string | number;
  isEmail?: boolean;
  isUrl?: boolean;
  isInteger?: boolean;
  required?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => IErrors[];
  isEmpty?: boolean;
}

const compareLength = (value: string | number, min: number, max: number): IErrors[] => {
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

const compareInteger = (value: string | number, min: number, max: number): IErrors[] => {
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

const validateData = (value: ICompareArgs): IErrors[] => {
  const {
    data,
    required,
    minLength,
    maxLength,
    isInteger,
    minInteger,
    maxInteger,
    isEmpty,
    isEmail,
    isUrl,
    customValidation,
  } = value || {};
  let err = [];
  if (required) {
    if (isEmpty) {
      err.push({ id: v4(), value: 'Поле является обязательным, но незаполнено!' });
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
};

export default validateData;
