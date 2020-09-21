import React from 'react';
import './UIInput.scss';
import InputMask from 'react-input-mask';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { Popup } from 'semantic-ui-react';
import * as moment from 'moment';
import { validateEmail, validateUrl } from '../utilities/helpers';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';
import ClearIcon from './clear-icon.svg';
import HintIcon from './hint-icon.svg';

interface IUIInputProps {
  title?: string;
  name: string;
  callback: (name: string, value: string | number) => void;
  mask?: string;
  minLength?: number;
  data: string | number;
  disabled?: boolean;
  isEmail?: boolean;
  isUrl?: boolean;
  isDate?: boolean;
  isMoney?: boolean;
  isPassword?: boolean;
  isInteger?: boolean;
  successFormat?: string;
  dateFormat?: string;
  required?: boolean;
  hint?: boolean;
  hintText?: string;
  hintIcon?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  maxInteger?: number;
  minInteger?: number;
}

function UIInput(props: IUIInputProps) {
  const {
    title,
    name,
    callback,
    mask,
    minLength = 0,
    data,
    isEmail,
    isUrl,
    disabled,
    isDate,
    dateFormat = 'LLL',
    isPassword,
    successFormat,
    isMoney,
    required,
    hint,
    hintText,
    hintIcon,
    placeholder,
    readOnly,
    type,
    isInteger,
    maxInteger,
    minInteger,
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

  const composeLength = React.useCallback(
    () => data.toString().length >= minLength,
    [data, minLength],
  );

  const composeInteger = React.useCallback(
    () => data >= (minInteger || -Infinity)
      && data <= (maxInteger || Infinity),
    [
      data,
      minInteger,
      maxInteger,
    ],
  );

  const className = React.useMemo(() => {
    let str = 'ui-input';
    if (readOnly) {
      str = `${str} read-only`;
    }
    if (type) {
      str = `${str} ${type}`;
    }
    if (hint) {
      str = `${str} hint`;
    }
    if (required) {
      str = `${str} required`;
      if (!data && data !== 0) {
        str = `${str} error`;
      }
    }
    if (data || data === 0) {
      if (!isInteger && required && minLength) {
        if (composeLength()) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
      if (!isInteger && minLength) {
        if (!composeLength()) {
          str = `${str} error`;
        }
      }
      if (isInteger && (minInteger || maxInteger)) {
        if (composeInteger()) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
      if (isEmail) {
        if (validateEmail(data)) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
      if (isUrl) {
        if (validateUrl(data)) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
    } else {
      if (!isInteger && minLength) {
        str = `${str} error`;
      }
      str = `${str} empty`;
    }
    return str;
  }, [
    type,
    hint,
    readOnly,
    composeLength,
    data,
    isEmail,
    minLength,
    required,
    isUrl,
    isInteger,
    composeInteger,
    maxInteger,
    minInteger,
  ]);

  const momentDate = React.useMemo(() => {
    if (isDate && data) {
      moment.locale('ru');
      return moment.default(data).format(dateFormat);
    }
    return data ?? '';
  }, [data, dateFormat, isDate]);

  const renderBody = React.useMemo(() => {
    if (readOnly) {
      return (
        <div
          className="ellipsis-element"
          title={momentDate.toString() ?? 'нет данных'}
        >
          {momentDate ?? 'нет данных'}
        </div>
      );
    }
    if (!isMoney) {
      return (
        <InputMask
          className="ui-input__input"
          onChange={handleChangeMaskInput}
          mask={mask}
          value={momentDate}
          maskChar={null}
          formatChars={{
            0: '[0-9]',
            a: '[A-Za-z]',
            '*': '[A-Za-z0-9]',
          }}
          type={isPassword
            ? 'password'
            : 'text'}
          disabled={!!disabled}
          placeholder={placeholder}
        />
      );
    }
    return (
      <NumberFormat
        className="ui-input__input"
        thousandSeparator
        onValueChange={handleChangeNumberInput}
        value={data}
      />
    );
  }, [
    readOnly,
    data,
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
          <div className="ui-input__title-content" title={title}>
            <span className="ellipsis-element">
              {title}
            </span>
            {required && !readOnly && <div className="required-icon">*</div>}
            {hint && !readOnly && (
              <div className="ui-input__hint">
                <Popup
                  content={hintText}
                  trigger={<div className="ui-input__hint-icon">{hintIcon || <HintIcon />}</div>}
                  basic
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="ui-input__body" ref={elRef}>
        {!disabled && !readOnly && (
          <div role="presentation" className="ui-input__clear" title="Очистить" onClick={handleClear}>
            <ClearIcon />
          </div>
        )}
        {renderBody}
        {!readOnly && !disabled && (
          <>
            <div className="ui-input__error" title="Ошибка в поле">
              <ErrorIcon />
            </div>
            <div className="ui-input__success" title="Поле заполнено верно">
              <SuccessIcon />
            </div>
          </>
        )}
        {successFormat && <div className="ui-input__i-error">{successFormat}</div>}
      </div>
    </div>
  );
}

export default React.memo(UIInput);