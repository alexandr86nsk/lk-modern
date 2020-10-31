import React from 'react';
import './UIInput.scss';
import InputMask from 'react-input-mask';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import * as moment from 'moment';
import { validateEmail, validateUrl } from '../utilities/helpers';
import ErrorIcon from './error-icon--outline.svg';
import SuccessIcon from './check-icon--outline.svg';
import ClearIcon from './clear-icon.svg';
import HintIcon from './hint-icon.svg';
import SearchIcon from './search-icon.svg';
import RequiredIcon from './required-icon.svg';
import classNameGenerator from '../utilities/classNameGenerator';

const compareLength = (value: string | number, min: number, max: number): string[] => {
  try {
    const hasMin = !!(min || min === 0);
    const hasMax = !!(max || max === 0);
    const errors = [];
    const stringifiedValue = value.toString();
    const valueLength = stringifiedValue.length;
    if (hasMin && valueLength < min) {
      errors.push(`Количество введенных символов, меньше минимально допустимого! Минимум: ${min}.`);
    }
    if (hasMax && valueLength > max) {
      errors.push(`Количество введенных символов, больше максимально допустимого! Максимум: ${max}.`);
    }
    return errors;
  } catch (e) {
    console.log('[UIInput] Error: ', e);
    return [];
  }
};

const compareInteger = (value: string | number, min: number, max: number): string[] => {
  try {
    const hasMin = !!(min || min === 0);
    const hasMax = !!(max || max === 0);
    const errors = [];
    let numberifiedValue = value;
    if (typeof value === 'string') {
      numberifiedValue = parseInt(value, 10);
    }
    if (hasMin && numberifiedValue < min) {
      errors.push(`Указанное значение, меньше минимально допустимого! Минимум: ${min}.`);
    }
    if (hasMax && numberifiedValue > max) {
      errors.push(`Указанное значение, больше максимально допустимого! Максимум: ${max}.`);
    }
    return errors;
  } catch (e) {
    console.log('[UIInput] Error: ', e);
    return [];
  }
};

interface IUIInputProps {
  title?: string;
  name: string;
  callback: (name: string, value: string | number) => void;
  mask?: string | Array<string|RegExp>;
  minLength?: number;
  maxLength?: number;
  data: string | number;
  disabled?: boolean;
  isEmail?: boolean;
  isUrl?: boolean;
  isDate?: boolean;
  isMoney?: boolean;
  isPassword?: boolean;
  isInteger?: boolean;
  dateFormat?: string;
  required?: boolean;
  hint?: boolean;
  hintMessage?: string;
  hintIcon?: string;
  placeholder?: string;
  isReadOnly?: boolean;
  type?: string;
  isSearch?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => string[];
}

function UIInput(props: IUIInputProps) {
  const {
    title,
    name,
    callback,
    mask,
    minLength = 0,
    maxLength,
    data,
    isEmail,
    isUrl,
    disabled,
    isDate,
    dateFormat = 'LLL',
    isPassword,
    isMoney,
    required,
    hint,
    hintMessage,
    placeholder,
    isReadOnly,
    type,
    isInteger,
    maxInteger,
    minInteger,
    isSearch,
    customValidation,
  } = props || {};

  const elRef = React.useRef<HTMLHeadingElement | null>(null);

  const handleChangeMaskInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (callback) {
      const { target } = event || {};
      const { value } = target || {};
      let res;
      if (value) {
        if (isInteger) {
          res = parseInt(value, 10);
        } else {
          res = value;
        }
      }
      callback(name, res);
    }
  }, [isInteger, callback, name]);

  const handleChangeNumberInput = React.useCallback((values: NumberFormatValues) => {
    if (callback) {
      const { value } = values || {};
      callback(
        name,
        value ?? undefined,
      );
    }
  }, [callback, name]);

  const handleFocusInput = React.useCallback(() => {
    if (elRef) {
      const { current } = elRef || {};
      const inputs = current.getElementsByTagName('input');
      if (inputs && inputs[0]) {
        inputs[0].focus();
      }
    }
  }, []);

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, undefined);
      handleFocusInput();
    }
  }, [callback, name, handleFocusInput]);

  const isEmpty = React.useMemo(() => !data && data !== 0, [data]);

  const errors = React.useMemo((): string[] => {
    let err = [];
    if (required) {
      if (isEmpty) {
        err.push('Поле является обязательным, но незаполнено!');
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
          err.push('Поле заполнено неверно! Пример верного формата: example@gmail.com');
        }
      }
      if (isUrl) {
        if (!validateUrl(data)) {
          err.push('Поле заполнено неверно! Пример верного формата: http://example.ru');
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
  }, [
    isEmpty,
    customValidation,
    data,
    isEmail,
    minLength,
    maxLength,
    required,
    isUrl,
    isInteger,
    maxInteger,
    minInteger,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const className = React.useMemo((): string => classNameGenerator({
    baseClass: 'ui-input',
    isReadOnly,
    type,
    disabled,
    errors,
  }), [errors, isReadOnly, type, disabled]);

  const momentDate = React.useMemo(() => {
    if (isDate && data) {
      return moment.default(data).format(dateFormat);
    }
    return data ?? '';
  }, [data, dateFormat, isDate]);

  const renderBody = React.useMemo(() => {
    if (isMoney) {
      return (
        <NumberFormat
          className="ui-input__input"
          thousandSeparator
          onValueChange={handleChangeNumberInput}
          value={momentDate}
        />

      );
    }
    return (
      <InputMask
        className="ui-input__input"
        onChange={handleChangeMaskInput}
        mask={mask}
        value={momentDate}
        maskChar={null}
        formatChars={{
          0: '[0-9]',
          a: '[A-zА-я]',
          '*': '[A-Za-z0-9]',
        }}
        type={isPassword
          ? 'password'
          : 'text'}
        disabled={!!disabled}
        placeholder={placeholder}
      />
    );
  }, [
    disabled,
    handleChangeNumberInput,
    placeholder,
    isPassword,
    momentDate,
    mask,
    handleChangeMaskInput,
    isMoney,
  ]);

  const renderErrors = React.useMemo(() => {
    if (errors && Array.isArray(errors)) {
      return errors.map((v) => (<li>{v}</li>));
    }
    return null;
  }, [errors]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-input__title">
          <div className="ui-input__inner-wrapper">
            <div className="ui-input__text" title={title}>
              {title}
            </div>
            {required && !isReadOnly && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--required" title="Обязательное поле">
                  <RequiredIcon />
                </div>
              </div>
            )}
            {hint && !isReadOnly && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--hint">
                  <HintIcon />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div role="presentation" className="ui-input__body" ref={elRef} onClick={handleFocusInput}>
        <div className="ui-input__inner-wrapper">
          {renderBody}
          {!disabled && !isReadOnly && (
          <>
            {!isEmpty && (
              <div className="ui-input__icon-wrapper">
                <div role="presentation" className="ui-input__icon ui-input__icon--clear" title="Очистить" onClick={handleClear}>
                  <ClearIcon />
                </div>
              </div>
            )}
            {errors && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--error" title="Ошибка в поле">
                  <ErrorIcon />
                </div>
              </div>
            )}
            {required && !errors && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--success" title="Поле заполнено верно">
                  <SuccessIcon />
                </div>
              </div>
            )}
          </>
          )}
          {isSearch && (
            <div className="ui-input__icon-wrapper">
              <div className="ui-input__icon ui-input__icon--search" title="Поиск">
                <SearchIcon />
              </div>
            </div>
          )}
        </div>
        {errors && (
          <div className="ui-input__i-error">
            <ul>
              {renderErrors}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(UIInput);
