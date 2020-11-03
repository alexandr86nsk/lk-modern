import React from 'react';
import './style.scss';
import ErrorIcon from './icons/error-icon--outline.svg';
import SuccessIcon from './icons/check-icon--outline.svg';
import ClearIcon from './icons/clear-icon.svg';
import HintIcon from './icons/hint-icon.svg';
import SearchIcon from './icons/search-icon.svg';
import RequiredIcon from './icons/required-icon.svg';
import VisibilityIcon from './icons/visibility-icon.svg';
import VisibilityOffIcon from './icons/visibility-icon--off.svg';
import generateClassName from './utils/generateClassName';
import validateData from './utils/validateData';
import generatePopupStyle from './utils/generatePopupStyle';
import UIInput from './elementTypes/UIInput';
import useOutsideClick from '../UICustomHooks/useOutsideClick/useOutsideClick';
import useDebounce from '../UICustomHooks/useDebounce';
import { IUIFormElementProps, PopupStyle, CustomError } from './@types';

function UIFormElement(props: IUIFormElementProps) {
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
    elementType,
    isInteger,
    maxInteger,
    minInteger,
    isSearch,
    customValidation,
  } = props || {};

  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const hintIconRef = React.useRef<HTMLDivElement | null>(null);
  const hintMessageRef = React.useRef<HTMLDivElement | null>(null);

  const [hintStyle, setHintStyle] = React.useState<PopupStyle | null>(null);
  const [isFocusedInput, setIsFocusedInput] = React.useState(false);
  const [passVisibility, setPassVisibility] = React.useState(false);

  const handleSetFocusedInput = React.useCallback(() => {
    setIsFocusedInput(true);
  }, []);

  const handleSetUnFocusedInput = React.useCallback(() => {
    setIsFocusedInput(false);
  }, []);

  const handleSetPassVisibility = React.useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    setPassVisibility((prev) => !prev);
  }, []);

  useOutsideClick(bodyRef, handleSetUnFocusedInput);

  const getHintCoords = React.useCallback(() => {
    setHintStyle(generatePopupStyle(hintIconRef, hintMessageRef));
  }, []);

  const clearHintCoords = React.useCallback(() => {
    setHintStyle(null);
  }, []);

  const handleFocusInput = React.useCallback(() => {
    if (bodyRef) {
      const { current } = bodyRef || {};
      const inputs = current.getElementsByTagName('input');
      if (inputs && inputs[0]) {
        try {
          inputs[0].focus();
        } catch (e) {
          console.log('[UIFormElement] Error: ', e);
        }
      }
    }
  }, []);

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, undefined);
    }
  }, [callback, name]);

  const isEmpty = React.useMemo(() => !data && data !== 0, [data]);

  const debouncedData = useDebounce(data, isEmpty ? 0 : 500);

  const errors = React.useMemo(() => validateData({
    data: debouncedData,
    required,
    minLength,
    maxLength,
    isInteger,
    minInteger,
    maxInteger,
    isEmail,
    isUrl,
    customValidation,
  }), [
    debouncedData,
    customValidation,
    isEmail,
    minLength,
    maxLength,
    required,
    isUrl,
    isInteger,
    maxInteger,
    minInteger,
  ]);

  const className = React.useMemo((): string => generateClassName({
    baseClass: 'ui-form-element',
    isReadOnly,
    type,
    disabled,
    errors,
    required,
    isFocusedInput,
    isEmpty,
  }), [isEmpty, isFocusedInput, errors, isReadOnly, type, disabled, required]);

  const renderBody = React.useMemo(() => {
    switch (elementType) {
      case 'input':
        return (
          <UIInput
            data={data}
            callback={callback}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            isPassword={isPassword}
            dateFormat={dateFormat}
            isDate={isDate}
            mask={mask}
            isMoney={isMoney}
            onFocus={handleSetFocusedInput}
            passVisibility={passVisibility}
          />
        );
      case 'select':
        return null;
      default: return null;
    }
  }, [
    handleSetFocusedInput,
    data,
    name,
    elementType,
    callback,
    disabled,
    placeholder,
    isPassword,
    dateFormat,
    isDate,
    mask,
    isMoney,
    passVisibility,
  ]);

  const renderErrors = React.useMemo(() => {
    if (errors && Array.isArray(errors)) {
      return errors.map((v: CustomError) => {
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
        <div className="ui-form-element__title">
          <div className="ui-form-element__inner-wrapper">
            <div className="ui-form-element__text" title={title}>
              <span>{title}</span>
            </div>
            {required && !isReadOnly && (
              <div className="ui-form-element__icon-wrapper">
                <div className="ui-form-element__icon ui-form-element__icon--required" title="Обязательное поле">
                  <RequiredIcon />
                </div>
              </div>
            )}
            {hint && !isReadOnly && (
              <div className="ui-form-element__icon-wrapper">
                <div
                  role="presentation"
                  className="ui-form-element__icon ui-form-element__icon--hint"
                  ref={hintIconRef}
                  onMouseEnter={getHintCoords}
                  onMouseLeave={clearHintCoords}
                >
                  <HintIcon />
                  <div className="ui-form-element__hint" ref={hintMessageRef} style={hintStyle || undefined}>
                    {hintMessage}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div role="presentation" className="ui-form-element__body" ref={bodyRef} onClick={handleFocusInput}>
        <div className="ui-form-element__inner-wrapper">
          <div className="ui-form-element__input-wrapper">
            {renderBody}
          </div>
          {!disabled && !isReadOnly && (
            <>
              {!isEmpty && (
                <div className="ui-form-element__icon-wrapper">
                  <div
                    role="presentation"
                    className="ui-form-element__icon ui-form-element__icon--clear"
                    title="Очистить"
                    onClick={handleClear}
                  >
                    <ClearIcon />
                  </div>
                </div>
              )}
              {isPassword && (
                <div className="ui-form-element__icon-wrapper">
                  <div
                    role="presentation"
                    className="ui-form-element__icon ui-form-element__icon--visibility"
                    title={passVisibility ? 'Скрыть' : 'Показать'}
                    onClick={handleSetPassVisibility}
                  >
                    {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </div>
                </div>
              )}
              {errors && (
                <div className="ui-form-element__icon-wrapper">
                  <div className="ui-form-element__icon ui-form-element__icon--error" title="Ошибка в поле">
                    <ErrorIcon />
                  </div>
                </div>
              )}
              {required && !errors && (
                <div className="ui-form-element__icon-wrapper">
                  <div className="ui-form-element__icon ui-form-element__icon--success" title="Поле заполнено верно">
                    <SuccessIcon />
                  </div>
                </div>
              )}
            </>
          )}
          {isSearch && (
            <div className="ui-form-element__icon-wrapper">
              <div className="ui-form-element__icon ui-form-element__icon--search" title="Поиск">
                <SearchIcon />
              </div>
            </div>
          )}
        </div>
        {errors && isFocusedInput && (
          <div className="ui-form-element__i-error">
            <ul>
              {renderErrors}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(UIFormElement);
