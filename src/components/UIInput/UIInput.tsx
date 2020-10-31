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
import classNameGenerator from "../utilities/classNameGenerator";

const compareLength = (value: string | number, min: number, max: number): boolean => {
  try {
    const stringifiedValue = value.toString();
    const valueLength = stringifiedValue.length;
    return valueLength >= (min || -Infinity) && valueLength <= (max || Infinity);
  } catch (e) {
    console.log('[UIInput] Error: ', e);
    return false;
  }
};

const compareInteger = (value: string | number, min: number, max: number): boolean => {
  try {
    let numberifiedValue = value;
    if (typeof value === 'string') {
      numberifiedValue = parseInt(value, 10);
    }
    return numberifiedValue >= (min || -Infinity) && numberifiedValue <= (max || Infinity);
  } catch (e) {
    console.log('[UIInput] Error: ', e);
    return false;
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
  validationMessage?: string;
  dateFormat?: string;
  required?: boolean;
  hint?: boolean;
  hintMessage?: string;
  hintIcon?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  isSearch?: boolean;
  maxInteger?: number;
  minInteger?: number;
  customValidation?: (value: string | number) => boolean;
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
    validationMessage,
    isMoney,
    required,
    hint,
    hintMessage,
    placeholder,
    readOnly,
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

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, undefined);
      if (elRef) {
        const { current } = elRef || {};
        const inputs = current.getElementsByTagName('input');
        if (inputs && inputs[0]) {
          inputs[0].focus();
        }
      }
    }
  }, [callback, name]);

  const className = React.useMemo(() => {
    return classNameGenerator();
  }, [];

  const errors = React.useMemo(() => {
    const err = [];
    if (required) {
      if (!data && data !== 0) {
        err.push('Поле')
      }
    }
    if (data || data === 0) {
      if (required && !isInteger && (minLength || maxLength)) {
        if (compareLength()) {
          cls = `${cls} success`;
        }
      }
      if (!isInteger && (minLength || maxLength)) {
        if (!compareLength()) {
          cls = `${cls} error`;
        }
      }
      if (required && isInteger && (minInteger || maxInteger)) {
        if (compareInteger()) {
          cls = `${cls} success`;
        }
      }
      if (isInteger && (minInteger || maxInteger)) {
        if (!compareInteger()) {
          cls = `${cls} error`;
        }
      }
      if (required && isEmail) {
        if (validateEmail(data)) {
          cls = `${cls} success`;
        }
      }
      if (isEmail) {
        if (!validateEmail(data)) {
          cls = `${cls} error`;
        }
      }
      if (required && isUrl) {
        if (validateUrl(data)) {
          cls = `${cls} success`;
        }
      }
      if (isUrl) {
        if (!validateUrl(data)) {
          cls = `${cls} error`;
        }
      }
      if (required && customValidation && customValidation(data)) {
        cls = `${cls} success`;
      }
      if (customValidation && !customValidation(data)) {
        cls = `${cls} error`;
      }
    } else {
      cls = `${cls} empty`;
    }
    return cls;
  }, [
      customValidation,
    disabled,
    isSearch,
    type,
    hint,
    readOnly,
    data,
    isEmail,
    minLength,
    maxLength,
    required,
    isUrl,
    isInteger,
    maxInteger,
    minInteger,
  ])

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

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-input__title">
          <div className="ui-input__inner-wrapper">
            <div className="ui-input__text" title={title}>
              {title}
            </div>
            {required && !readOnly && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--required" title="Обязательное поле">
                  <RequiredIcon />
                </div>
              </div>
            )}
            {hint && !readOnly && (
              <div className="ui-input__icon-wrapper">
                <div className="ui-input__icon ui-input__icon--hint">
                  <HintIcon />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="ui-input__body" ref={elRef}>
        <div className="ui-input__inner-wrapper">
          {renderBody}
          {!disabled && !readOnly && (
          <>
            <div className="ui-input__icon-wrapper">
              <div role="presentation" className="ui-input__icon ui-input__icon--clear" title="Очистить" onClick={handleClear}>
                <ClearIcon />
              </div>
            </div>
            <div className="ui-input__icon-wrapper">
              <div className="ui-input__icon ui-input__icon--error" title="Ошибка в поле">
                <ErrorIcon />
              </div>
            </div>
            <div className="ui-input__icon-wrapper">
              <div className="ui-input__icon ui-input__icon--success" title="Поле заполнено верно">
                <SuccessIcon />
              </div>
            </div>
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
        {validationMessage && <div className="ui-input__i-error">{validationMessage}</div>}
      </div>
    </div>
  );
}

export default React.memo(UIInput);
