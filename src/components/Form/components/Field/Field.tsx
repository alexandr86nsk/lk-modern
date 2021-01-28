import cn from 'classnames';
import React, { memo, useCallback, useRef, useState, useMemo, useEffect } from 'react';

import { defaultValues } from '@src/constants';
import { useOutsideClick, useDebounce } from '@src/hooks';
import { emptyValueChecker, isDefined, isNotEmptyArray } from '@src/utils';

import { Title } from '@components/Form/components/Title';
import { CustomError } from '@components/Form/types';
import { Icon } from '@components/Icon';

import { FieldInfo } from './FieldInfo';
import { FieldProps } from './types';

import './styles.scss';

const DEBOUNCE_DELAY = 500;

const FieldComponent = ({
  type = 'text',
  name,
  title,
  value,
  onChange,
  isReadOnly,
  isDisabled,
  isShowErrors,
  isAutoComplete,
  icon,
  className,
  theme = 'basic',
}: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const [showValidationState, setShowValidationState] = useState(false);
  const [passVisibility, setPassVisibilityState] = useState(false);
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldRef = useRef(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  const onInsideClick = useCallback(
    (event) => {
      if (!focused) {
        setFocused(true);
      }
      if (
        document.activeElement !== inputRef.current &&
        !bubbleRef.current?.contains(event.target)
      ) {
        inputRef.current?.focus();
      }
    },
    [focused]
  );

  const onOutsideClick = useCallback(() => {
    setFocused(false);
  }, []);

  useOutsideClick(fieldRef, onOutsideClick);

  const onInputChange = useCallback(
    (event) => {
      if (isDefined(onChange)) {
        onChange(
          {
            name,
            value: event.target?.value,
          },
          event
        );
      }
    },
    [name, onChange]
  );

  const onMouseDown = useCallback((event) => {
    if (!inputRef.current?.contains(event.target) && !bubbleRef.current?.contains(event.target)) {
      event.preventDefault();
    }
  }, []);

  const onClearClick = useCallback(() => {
    onInputChange({ target: {} });
  }, [onInputChange]);

  const onChangePassVisibilityClick = useCallback(() => {
    setSelectionRange({
      start: inputRef.current?.selectionStart || defaultValues.ZERO,
      end: inputRef.current?.selectionEnd || defaultValues.ZERO,
    });
    setPassVisibilityState((prev) => !prev);
  }, []);

  const isEmpty = useMemo(() => {
    return emptyValueChecker(value);
  }, [value]);

  const debouncedInputValue = useDebounce(value, isEmpty ? defaultValues.ZERO : DEBOUNCE_DELAY);

  useEffect(() => {
    if (!emptyValueChecker(debouncedInputValue)) {
      setShowValidationState(true);
    }
  }, [debouncedInputValue]);

  /*const errors = useMemo(() => {
    const err = [];
    if (isNotNil(debouncedInputValue) && typeof debouncedInputValue === 'string') {
      if (debouncedInputValue?.length < MIN_VALUE_LENGTH) {
        err.push({ id: '0', value: 'Минимальное число символов 5' });
      }
      if (debouncedInputValue?.includes('6')) {
        err.push({ id: '1', value: 'Поле не должно содержать цифру 6' });
      }
      if (debouncedInputValue?.includes('4')) {
        err.push({
          id: '2',
          value: 'Очень очень длинная ошибка которая может встретиться в ошибках заполнения поля',
        });
      }
    }
    return err;
  }, [debouncedInputValue]);*/

  const errors: CustomError[] = [];

  const memoizedShowValidationState = useMemo(() => {
    return showValidationState || isShowErrors;
  }, [isShowErrors, showValidationState]);

  const inputType = useMemo(() => {
    if (type === 'password') {
      if (passVisibility) {
        return 'text';
      } else {
        return 'password';
      }
    }
    return type;
  }, [type, passVisibility]);

  useEffect(() => {
    inputRef.current?.setSelectionRange(selectionRange.start, selectionRange.end);
  }, [selectionRange]);

  return (
    <div
      className={cn('rl-field', className, {
        'rl-field_state_focused': focused,
        'rl-field_type_error': isNotEmptyArray(errors),
        [`rl-field_theme_${theme}`]: theme,
      })}
      role="button"
      onClick={onInsideClick}
      onMouseDown={onMouseDown}
      ref={fieldRef}
    >
      <Title text={title} />
      <div className="rl-field__inner">
        {isDefined(icon) && (
          <div className="rl-field__label">
            <Icon className="rl-field__icon" name={icon} />
          </div>
        )}
        <div className="rl-field__input">
          <input
            type={inputType}
            ref={inputRef}
            value={value || ''}
            onChange={onInputChange}
            autoComplete={isAutoComplete ? 'on' : 'off'}
          />
        </div>
        <FieldInfo
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
          type={type}
          onClearClick={onClearClick}
          passVisibility={passVisibility}
          onChangePassVisibilityClick={onChangePassVisibilityClick}
          isShowErrors={memoizedShowValidationState}
          errors={errors}
          value={value}
        />
        <div className="rl-field__bubble" ref={bubbleRef}>
          {isNotEmptyArray(errors) && (
            <ul className="rl-field__errors">
              {errors.map((v) => {
                const { id, value } = v || {};
                return <li key={id}>{value}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export const Field = memo(FieldComponent);
