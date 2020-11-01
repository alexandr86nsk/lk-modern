import React from 'react';
import './UIInput.scss';
import InputMask from 'react-input-mask';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import * as moment from 'moment';
import ErrorIcon from './error-icon--outline.svg';
import SuccessIcon from './check-icon--outline.svg';
import ClearIcon from './clear-icon.svg';
import HintIcon from './hint-icon.svg';
import SearchIcon from './search-icon.svg';
import RequiredIcon from './required-icon.svg';
import classNameGenerator from './utils/classNameGenerator';
import compare, { IErrors } from './utils/compare';
import generateHintStyle from './utils/setHintStyle';

export interface IUFormProps {
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
  customValidation?: (value: string | number) => IErrors[];
  isEmpty?: boolean;
}

function UIInput(props: IUFormProps) {
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
      setHintStyle(generateHintStyle(hintIconRef, hintMessageRef));
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
    return compare({
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
    });
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
