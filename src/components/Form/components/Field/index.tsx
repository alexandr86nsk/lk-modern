import React, { memo, useCallback, useRef, useState } from 'react';

import { isNotNil } from '@src/utils';

import ClearIcon from './icons/clear-icon.svg';
import ErrorIcon from './icons/error-outline-icon.svg';
import SearchIcon from './icons/search-icon.svg';
import VisibilityIcon from './icons/visibility-icon.svg';
import VisibilityOffIcon from './icons/visibility-off-icon.svg';
import { FieldProps } from './types';

import './styles.scss';

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

  const errors: never[] = [];

  return (
    <div className="rl-field" role="presentation" ref={bodyRef} onClick={handleFocusInput}>
      <div className="rl-field__inner">
        <div className="rl-field__input">
          <input value={value} onChange={onInputChangeHandler} />
        </div>
        {!isDisabled && !isReadOnly && (
          <>
            {isNotNil(value) && (
              <div
                role="presentation"
                className="rl-field__icon rl-field__icon_type_clear"
                title="Очистить"
                onClick={clearClickHandler}
              >
                <ClearIcon />
              </div>
            )}
            {isPassword && (
              <div
                role="presentation"
                className="rl-field__icon rl-field__icon_type_visibility"
                title={passVisibility ? 'Скрыть' : 'Показать'}
                onClick={changePassVisibilityHandler}
              >
                {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            )}
            {errors && (
              <div className="rl-field__icon rl-field__icon_type_error" title="Ошибка в поле">
                <ErrorIcon />
              </div>
            )}
          </>
        )}
        {isSearch && (
          <div className="rl-field__icon rl-field__icon_type_error" title="Поиск">
            <SearchIcon />
          </div>
        )}
      </div>
      {errors && !isShowErrorsState && (
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
