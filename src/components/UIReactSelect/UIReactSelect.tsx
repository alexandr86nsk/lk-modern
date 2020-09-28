import React, { CSSProperties } from 'react';
import './UIReactSelect.scss';
import Select from 'react-select';
import { GroupedOptionsType } from 'react-select/src/types';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

interface IOptions {
  [index: number]: { value?: string | number; label?: string };
  value?: string | number;
  label?: string;
  length: number;
  map: (v: any) => any[];
  filter: (v: any) => any[];
}

interface IUIReactSelectProps {
  title?: string;
  name: string;
  callback?: (name: string, value: string | number | any[]) => void;
  fullValueCallback?: (name: string, value: string | number | any) => void;
  data: string | number | any[];
  type?: string;
  options: IOptions;
  noOptionsMessage?: string;
  hint?: JSX.Element;
  required?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  loadingMessage?: (obj: { inputValue: string }) => string | null;
}

const customStyles = {
  control: (props: CSSProperties) => ({
    ...props,
    borderRadius: '.6em',
    minHeight: 'unset',
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
    placeholder,
    readOnly,
    loading,
    disabled,
    loadingMessage,
  } = props || {};

  const renderPlaceholder = React.useMemo(() => {
    if (placeholder) {
      return placeholder;
    }
    if (type && type.includes('--translate-title')) {
      return '';
    }
    return 'Выберите значение';
  }, [placeholder, type]);

  const handleChange = React.useCallback((res: IOptions) => {
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
    if (!(data === 0 || data)) {
      str = `${str} empty`;
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

  const memoizedValue: IOptions = React.useMemo(() => {
    if (options && Array.isArray(options)) {
      if (!isMulti) {
        const result = options.filter((v: IOptions) => {
          const { value: thisValue } = v || {};
          return thisValue === data;
        });
        return result[0] as IOptions || undefined;
      }
      return Array.isArray(data)
        ? data.map(
          (x: string | number) => options.find((v: IOptions) => v.value === x) as IOptions,
        )
        : undefined;
    }
    return undefined;
  }, [isMulti, data, options]);

  const renderBody = React.useMemo(() => {
    const { label: thisLabel } = memoizedValue || {};
    if (readOnly) {
      return (
        <div
          className="read-only ellipsis-element"
          title={thisLabel || 'нет данных'}
        >
          {thisLabel || 'нет данных'}
        </div>
      );
    }
    return (
      <Select
        styles={customStyles}
        isLoading={loading}
        className="ui-react-select__container"
        classNamePrefix="ui-react-select"
        placeholder={renderPlaceholder}
        noOptionsMessage={() => noOptionsMessage}
        options={options as GroupedOptionsType<IOptions>}
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
    renderPlaceholder,
    disabled,
    loadingMessage,
    loading,
    memoizedValue,
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
