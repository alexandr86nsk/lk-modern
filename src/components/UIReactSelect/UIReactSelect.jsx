import React from 'react';
import './UIReactSelect.scss';
import Select from 'react-select';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

const customStyles = {
  control: (props) => ({
    ...props,
    borderRadius: '.6em',
    minHeight: 'unset',
  }),
  clearIndicator: (props) => ({
    ...props,
    padding: '.6em',
    svg: {
      width: '1.5em',
      height: '1.5em',
    },
  }),
  dropdownIndicator: (props) => ({
    ...props,
    padding: '.6em',
    svg: {
      width: '1.5em',
      height: '1.5em',
    },
  }),
};

function UIReactSelect(props) {
  const {
    type,
    title,
    options = [],
    defaultOptions = [],
    name,
    data,
    callback,
    fullValueCallback,
    noOptionsMessage = 'Данные не загружены',
    hint,
    required,
    isClearable = true,
    isMulti,
    placeholder = 'Выберите значение',
    readOnly,
    loading,
    loadingMessage,
  } = props || {};

  const handleChange = React.useCallback((value) => {
    if (callback) {
      if (isMulti) {
        setTimeout(
          () => callback(
            name,
            value && value.length
              ? value.map((v) => v.value)
              : null,
          ),
          value && value.length
            ? 0
            : 200,
        );
      } else {
        callback(
          name,
          value
            ? value.value
            : null,
        );
      }
    }
    if (fullValueCallback) {
      fullValueCallback(name, value || null);
    }
  }, [
    callback,
    fullValueCallback,
    isMulti,
    name,
  ]);

  const className = React.useMemo(() => {
    let str = 'ui-react-select';
    if (type) {
      str = `${str} ${type}`;
    }
    if (required) {
      str = `${str} required`;
      if (!(data === 0 || data)) {
        str = `${str} error`;
      } else {
        str = `${str} success`;
      }
    }
    return str;
  }, [type, data, required]);

  const checkDefaultOptions = React.useCallback(() => {
    if (defaultOptions[0]) {
      return defaultOptions;
    }
    return options;
  }, [defaultOptions, options]);

  const memoizedValue = React.useMemo(() => {
    if (!isMulti) {
      return checkDefaultOptions().filter((v) => v.value === data)[0] || '';
    }
    return Array.isArray(data)
      ? data.map((x) => checkDefaultOptions().filter((v) => v.value === x)[0])
      : '';
  }, [isMulti, data, checkDefaultOptions]);

  const renderBody = React.useMemo(() => {
    if (readOnly) {
      return (
        <div
          className="read-only ellipsis-element"
          title={memoizedValue.label || 'нет данных'}
        >
          {memoizedValue.label || 'нет данных'}
        </div>
      );
    }
    return (
      <Select
        styles={customStyles}
        isLoading={loading}
        className="ui-react-select__container"
        classNamePrefix="ui-react-select"
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        options={options}
        onChange={handleChange}
        value={memoizedValue}
        menuPlacement="auto"
        isClearable={isClearable}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        loadingMessage={loadingMessage}
      />
    );
  }, [
    loading,
    memoizedValue,
    placeholder,
    options,
    noOptionsMessage,
    handleChange,
    isClearable,
    isMulti,
    readOnly,
  ]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-react-select__title" title={title}>
          <span className="ellipsis-element">{title}</span>
          {required && !readOnly && <div className="required-icon">*</div>}
          {hint && hint}
        </div>
      )}
      <div className="ui-react-select__body">
        {renderBody}
        {!readOnly && (
          <>
            <div className="ui-react-select__error" title="Ошибка">
              <ErrorIcon />
            </div>
            <div className="ui-react-select__success" title="Верно">
              <SuccessIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(UIReactSelect);
