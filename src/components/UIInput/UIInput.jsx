import React from 'react';
import './UIInput.scss';
import InputMask from 'react-input-mask';
import * as moment from 'moment';
import NumberFormat from 'react-number-format';
import { validateEmail, validateUrl } from '../utilities/helpers';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';
import ClearIcon from './clear-icon.svg';

function UIInput(props) {
  const {
    title,
    name = '',
    callback,
    mask = '',
    minLength = 0,
    data,
    email,
    url,
    disabled,
    dateTime,
    dateFormat = 'LLL',
    password,
    successFormat,
    numberFormat,
    required,
    hint,
    placeholder,
    readOnly,
  } = props;

  const elRef = React.useRef(null);

  const handleChangeMaskInput = React.useCallback((event) => {
    if (callback) {
      callback(name, event.target.value || null);
    }
  }, [callback, name]);

  const handleChangeNumberInput = React.useCallback((values) => {
    if (callback) {
      const { value } = values;
      callback(name, value || null);
    }
  }, [callback, name]);

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, null);
      if (elRef) {
        const inputs = elRef.current.getElementsByTagName('input');
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

  const className = React.useMemo(() => {
    let str = 'ui-input';
    if (readOnly) {
      str = `${str} read-only`;
    }
    if (required) {
      str = `${str} required`;
      if (!data && data !== 0) {
        str = `${str} error`;
      }
    }
    if (data || data === 0) {
      if (minLength) {
        if (composeLength()) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
      if (email) {
        if (validateEmail(data)) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
      if (url) {
        if (validateUrl(data)) {
          str = `${str} success`;
        } else {
          str = `${str} error`;
        }
      }
    } else {
      str = `${str} empty`;
    }
    return str;
  }, [
    readOnly,
    composeLength,
    data,
    email,
    minLength,
    required,
    url,
  ]);

  const momentDate = React.useMemo(() => {
    if (dateTime && data) {
      moment.locale('ru');
      return moment(data).format(dateFormat);
    }
    return data || '';
  }, [data, dateFormat, dateTime]);

  const renderBody = React.useMemo(() => {
    if (readOnly) {
      return (
        <div
          className="read-only ellipsis-element"
          title={momentDate || 'нет данных'}
        >
          {momentDate || 'нет данных'}
        </div>
      );
    }
    if (!numberFormat) {
      return (
        <InputMask
          className="ui-input__input"
          onChange={handleChangeMaskInput}
          // alwaysShowMask
          mask={mask}
          value={momentDate}
          maskChar={null}
          formatChars={{
            0: '[0-9]',
            a: '[A-Za-z]',
            '*': '[A-Za-z0-9]',
          }}
          type={password
            ? 'password'
            : 'text'}
          disabled={disabled}
          placeholder={placeholder || ''}
        />
      );
    }
    return (
      <NumberFormat
        className="ui-input__input"
        thousandSeparator
        onValueChange={handleChangeNumberInput}
        value={data || ''}
      />
    );
  }, [
    readOnly,
    data,
    disabled,
    handleChangeNumberInput,
    placeholder,
    password,
    momentDate,
    mask,
    handleChangeMaskInput,
    numberFormat,
  ]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-input__title-wrapper">
          <div className="ui-input__title">
            <span className="ellipsis-element">
              {title}
            </span>
            {required && !readOnly && <div className="required-icon">*</div>}
            {hint && !readOnly && hint}
          </div>
        </div>
      )}
      <div className="ui-input__body" ref={elRef}>
        {renderBody}
        {!disabled && !readOnly && (
        <div role="presentation" className="ui-input__clear" title="Очистить" onClick={handleClear}>
          <ClearIcon />
        </div>
        )}
        {!readOnly && !disabled && (
        <>
          <div className="ui-input__error" title="Ошибка">
            <ErrorIcon />
          </div>
          <div className="ui-input__success" title="Верно">
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
