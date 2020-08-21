import React from 'react';
import './UIReactSelect.scss';
import Select from 'react-select';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

interface IOptions {
  value?: string;
  label?: string;
  length?: number;
  map?: () => any[];
}

interface IUIReactSelectProps {
  title?: string;
  name: string;
  callback?: (name: string, value: string | number | any[]) => void;
  fullValueCallback?: (name: string, value: string | number | any) => void;
  data: string | number;
  type?: string;
  options: IOptions[];
  noOptionsMessage?: string;
  hint?: JSX.Element;
  required?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  loadingMessage?: string;
}

const customStyles = {
  control: (props: any) => ({
    ...props,
    borderRadius: '.6em',
    minHeight: 'unset',
  }),
  clearIndicator: (props: any) => ({
    ...props,
    padding: '.6em',
    svg: {
      width: '1.5em',
      height: '1.5em',
    },
  }),
  dropdownIndicator: (props: any) => ({
    ...props,
    padding: '.6em',
    svg: {
      width: '1.5em',
      height: '1.5em',
    },
  }),
};

function UIReactSelect(props: IUIReactSelectProps) {
  const {
    type,
    title,
    options,
    name,
    data,
    callback,
    fullValueCallback,
    noOptionsMessage = 'Список пуст',
    hint,
    required,
    isClearable = true,
    isMulti,
    placeholder = 'Выберите значение',
    readOnly,
    loading,
    disabled,
    loadingMessage,
  } = props || {};

  const handleChange = React.useCallback((res: IOptions[] | IOptions) => {
    const { length: thisLength, value: thisValue } = res || {};
    if (callback) {
      if (isMulti) {
        setTimeout(
          () => callback(
            name,
            thisLength
              ? res.map((v: IOptions) => {
                const { value: thisVal } = v || {};
                return thisVal;
              })
              : undefined,
          ),
          thisLength
            ? 0
            : 200,
        );
      } else {
        callback(
          name,
          res
            ? thisValue
            : undefined,
        );
      }
    }
    if (fullValueCallback) {
      fullValueCallback(name, res || undefined);
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

  const memoizedValue = React.useMemo(() => {
    if (!isMulti) {
      return options.filter((v) => v.value === data)[0] || '';
    }
    return Array.isArray(data)
      ? data.map((x) => options.filter((v) => v.value === x)[0])
      : '';
  }, [isMulti, data, options]);

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
        isDisabled={disabled}
      />
    );
  }, [
    disabled,
    loadingMessage,
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
