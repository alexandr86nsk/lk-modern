import React, { memo, useCallback, useRef, useState, useMemo } from 'react';

import { isNotEmptyArray, isTruthy } from '@src/utils';

import { Icon } from '@components/Icon';

import { FieldProps } from './types';

import './styles.scss';

const MIN_VALUE_LENGTH = 5;

function FieldComponent({ isReadOnly, isDisabled, isPassword, isSearch }: FieldProps) {
  const [value, setValue] = useState('');
  const [passVisibility, setPassVisibilityState] = React.useState(false);
  const [isShowErrorsState, setShowErrorsState] = React.useState(false);
  const bodyRef = useRef(null);

  const showErrors = useCallback(() => {
    setShowErrorsState(true);
  }, []);

  const handleFocusInput = useCallback(() => {
    showErrors();
  }, [showErrors]);

  const onInputChangeHandler = useCallback((event) => {
    const { value } = event?.target || {};
    setValue(value);
  }, []);

  const clearClickHandler = useCallback(() => {
    setValue('');
  }, []);

  const changePassVisibilityHandler = useCallback(() => {
    setPassVisibilityState((prev) => !prev);
  }, []);

  const errors = useMemo(() => {
    const err = [];
    if (value.length < MIN_VALUE_LENGTH) {
      err.push({ id: '0', value: 'Минимальное число символов 5' });
    }
    if (value.includes('6')) {
      err.push({ id: '1', value: 'Поле не должно содержать цифру 6' });
    }
    if (value.includes('4')) {
      err.push({
        id: '2',
        value: 'Очень очень длинная ошибка которая может встретиться в ошибках заполнения поля',
      });
    }
    return err;
  }, [value]);

  return (
    <div className="rl-field" role="presentation" ref={bodyRef} onClick={handleFocusInput}>
      <div className="rl-field__inner">
        <div className="rl-field__input">
          <input value={value} onChange={onInputChangeHandler} onFocus={handleFocusInput} />
        </div>
        {!isDisabled && !isReadOnly && (
          <>
            {isTruthy(value) && (
              <Icon
                className="rl-field__icon rl-field__icon_type_clear"
                name="clear"
                title="Очистить"
                onClick={clearClickHandler}
                isCompact
              />
            )}
            {isPassword && (
              <Icon
                className="rl-field__icon rl-field__icon_type_visibility"
                name={passVisibility ? 'visibilityOff' : 'visibilityOn'}
                title={passVisibility ? 'Скрыть' : 'Показать'}
                onClick={changePassVisibilityHandler}
                size="md"
                isCompact
              />
            )}
            {isNotEmptyArray(errors) && isShowErrorsState && (
              <Icon
                className="rl-field__icon rl-field__icon_type_error"
                name="errorOutline"
                title="Ошибка в поле"
                isCompact
              />
            )}
          </>
        )}
        {isSearch && (
          <Icon
            className="rl-field__icon rl-field__icon_type_search"
            name="search"
            title="Поиск"
            isCompact
          />
        )}
      </div>
      {isNotEmptyArray(errors) && isShowErrorsState && (
        <ul className="rl-field__errors">
          {errors.map((v) => {
            const { id, value } = v || {};
            return <li key={id}>{value}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export const Field = memo(FieldComponent);
