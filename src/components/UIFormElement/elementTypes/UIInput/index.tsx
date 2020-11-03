import React from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import InputMask from 'react-input-mask';
import * as moment from 'moment';
import { IUIInputProps } from '../../@types';

const UIInput = (props: IUIInputProps) => {
  const {
    name,
    data,
    callback,
    mask,
    disabled,
    isPassword,
    placeholder,
    isMoney,
    isInteger,
    dateFormat,
    isDate,
    onFocus,
    passVisibility,
  } = props || {};

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

  const handleChangeMaskInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (callback) {
      const { target } = event || {};
      const { value } = target || {};
      let res;
      if (value) {
        if (isInteger) {
          try {
            res = parseInt(value, 10);
          } catch (e) {
            console.log('[UIFormInput] Error: ', e);
          }
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

  if (isMoney) {
    return (
      <NumberFormat
        className="ui-form-element__input"
        thousandSeparator
        onValueChange={handleChangeNumberInput}
        value={momentDate}
        title={momentDate}
        onFocus={onFocus}
      />

    );
  }
  return (
    <InputMask
      className="ui-form-element__input"
      onChange={handleChangeMaskInput}
      mask={mask}
      value={momentDate}
      maskChar={null}
      formatChars={{
        0: '[0-9]',
        a: '[A-zА-я]',
        '*': '[A-Za-z0-9]',
      }}
      type={isPassword && !passVisibility
        ? 'password'
        : 'text'}
      disabled={!!disabled}
      placeholder={placeholder}
      title={momentDate}
      onFocus={onFocus}
    />
  );
};

export default React.memo(UIInput);
