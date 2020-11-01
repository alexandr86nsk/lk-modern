import React from 'react';
import './UIInput.scss';
import InputMask from 'react-input-mask';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import * as moment from 'moment';
import { v4 } from 'uuid';
import { validateEmail, validateUrl } from '../utilities/helpers';
import ErrorIcon from './error-icon--outline.svg';
import SuccessIcon from './check-icon--outline.svg';
import ClearIcon from './clear-icon.svg';
import HintIcon from './hint-icon.svg';
import SearchIcon from './search-icon.svg';
import RequiredIcon from './required-icon.svg';
import classNameGenerator from '../utilities/classNameGenerator';

type IErrors = {
  id: string;
  value: string;
};

const compareLength = (value: string | number, min: number, max: number) => {
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
    console.log('[UIInput] Error: ', e);
    return [];
  }
};

const compareInteger = (value: string | number, min: number, max: number) => {
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

  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const hintIconRef = React.useRef<HTMLDivElement | null>(null);
  const hintMessageRef = React.useRef<HTMLDivElement | null>(null);

  const [hintStyle, setHintStyle] = React.useState({});

  const getHintCoords = React.useCallback(() => {
    if (hintIconRef && hintMessageRef) {
      const { current: iconEl } = hintIconRef || {};
      const { current: messageEl } = hintMessageRef || {};
      const {
        top, right, left,
      } = iconEl.getBoundingClientRect();

      const {
        height,
      } = messageEl.getBoundingClientRect();

      let elLeft;
      let elRight;
      let elBottom;
      let elTop;
      let elWidth;

      if (document.body.offsetWidth - right > 250) {
        elLeft = '0px';
      }
      if (document.body.offsetWidth - right <= 250 && left > 250) {
        elRight = '0px';
      }
      if (document.body.offsetWidth - right <= 250 && left <= 250) {
        elLeft = left;
        elWidth = document.body.offsetWidth;
      }
      if (top >= height) {
        elBottom = 'calc(100% + 0.3em)';
      } else {
        elTop = 'calc(100% + 0.3em)';
      }

      setHintStyle({
        left: elLeft,
        right: elRight,
        bottom: elBottom,
        top: elTop,
        width: elWidth,
        visibility: 'visible',
      });
    }
  }, []);

  const clearHintCoords = React.useCallback(() => {
    setHintStyle({});
  }, []);

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
    if (bodyRef) {
      const { current } = bodyRef || {};
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

  const errors = React.useMemo(() => {
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
    required,
  }), [errors, isReadOnly, type, disabled, required]);

  const momentDate = React.useMemo(() => {
    try {
      if (isDate && data) {
        return moment.default(data).format(dateFormat);
      }
      return data.toString();
    } catch (e) {
      return '';
    }
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
      return errors.map((v: IErrors) => {
        const { id, value } = v || {};
        return (
          <li key={id}>{value}</li>
        );
      });
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
                <div
                  role="presentation"
                  className="ui-input__icon ui-input__icon--hint"
                  ref={hintIconRef}
                  onMouseEnter={getHintCoords}
                  onMouseLeave={clearHintCoords}
                >
                  <HintIcon />
                  <div className="ui-input__hint" ref={hintMessageRef} style={hintStyle}>
                    {hintMessage}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div role="presentation" className="ui-input__body" ref={bodyRef} onClick={handleFocusInput}>
        <div className="ui-input__inner-wrapper">
          <div className="ui-input__input-wrapper" title={momentDate}>
            {renderBody}
          </div>
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
