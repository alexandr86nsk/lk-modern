import React from 'react';
import './UISearch.scss';
import SearchIcon from './search-icon.svg';
import ClearIcon from './clear-icon.svg';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

interface IResultsStyle {
  top?: string;
  bottom?: string;
  maxHeight?: string;
}

interface IResults {
  value?: string;
  label?: string;
}

interface IUISearchProps {
  title?: string;
  callback: (name: string, value: string) => void;
  name: string;
  data: string;
  placeholder?: string;
  results?: IResults[];
  customResults?: string;
  hideResults?: boolean;
  searchServerSide?: boolean;
  loadingData?: boolean;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  type?: string;
  isInput?: boolean;
  isSelected?: boolean;
  successFormat?: string;
}

interface IResultItemProps {
  key: string;
  label: string;
  callback: (label: string) => void;
}

function ResultItem(props: IResultItemProps) {
  const {
    label,
    callback,
  } = props || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(label);
    }
  }, [label, callback]);

  return <li role="presentation" onKeyDown={handleClick}>{label}</li>;
}

const topStyle: IResultsStyle = {
  top: 'calc(100% + 2px)',
  maxHeight: '160px',
};

const bottomStyle: IResultsStyle = {
  bottom: 'calc(100% + 2px)',
  maxHeight: '160px',
};

function UISearch(props: IUISearchProps) {
  const {
    title,
    name,
    placeholder = 'Поиск',
    results,
    customResults,
    hideResults,
    callback,
    data = '',
    searchServerSide,
    loadingData,
    disabled,
    maxLength,
    required,
    type,
    isInput,
    isSelected,
    successFormat,
  } = props || {};

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [resultsStyle, setResultsStyle] = React.useState(topStyle);

  const calculateStyle = React.useCallback(() => {
    const { current } = inputRef || {};
    if (current) {
      const inputCoords = current.getBoundingClientRect();
      const { bottom, top } = inputCoords;
      const { innerHeight } = window;
      if (innerHeight - bottom < 165 && top > 165) {
        setResultsStyle(bottomStyle);
      } else {
        setResultsStyle(topStyle);
      }
    }
  }, []);

  const handleChangeInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (callback) {
      const { target } = event || {};
      const { value } = target || {};
      if (!searchServerSide) {
        setLoading(true);
        setTimeout(() => setLoading(false), 300);
      }
      calculateStyle();
      setSelected(false);
      callback(name, value);
    }
  }, [name, searchServerSide, callback, calculateStyle]);

  const handleSetInput = React.useCallback((value) => {
    if (callback) {
      setSelected(true);
      callback(name, value);
    }
  }, [name, callback]);

  const memoizedResults = React.useMemo(() => {
    if (results && Array.isArray(results) && results.length) {
      return results.map((v: IResults) => {
        const { value: thisValue, label: thisLabel } = v || {};
        return (
          <ResultItem key={thisValue} label={thisLabel} callback={handleSetInput} />
        );
      });
    }
    return (
      <li className="loading">Поиск не дал результатов</li>
    );
  }, [handleSetInput, results]);

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, undefined);
      if (inputRef) {
        const { current } = inputRef || {};
        current.focus();
      }
    }
  }, [name, callback]);

  const className = React.useMemo(() => {
    let str = 'ui-search';
    if (disabled) {
      str = `${str} disabled`;
    }
    if (type) {
      str = `${str} ${type}`;
    }
    if (isInput) {
      str = `${str} input`;
    }
    if (loading || loadingData) {
      str = `${str} loading`;
    }
    if (required) {
      str = `${str} required`;
      if (!data) {
        str = `${str} error`;
      } else if (isInput && (selected || isSelected)) {
        str = `${str} success`;
      }
    }
    if (data) {
      str = `${str} active`;
    } else {
      str = `${str} empty`;
    }
    return str;
  }, [
    selected,
    isInput,
    isSelected,
    required,
    disabled,
    loading,
    loadingData,
    type,
    data,
  ]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-search__title">
          <div className="ui-search__title-content" title={title}>
            <span className="ellipsis-element">
              {title}
            </span>
            {required && <div className="required-icon">*</div>}
          </div>
        </div>
      )}
      <div className="ui-search__body">
        {data && !disabled && (
          <div role="presentation" className="ui-search__clear" title="Очистить" onClick={handleClear}>
            <ClearIcon />
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className="ui-search__input"
          placeholder={placeholder}
          value={data}
          onChange={handleChangeInput}
          disabled={disabled}
          maxLength={maxLength}
        />
        {data && !hideResults && (
          <ul className="ui-search__results" style={resultsStyle}>
            {(loadingData || loading) && <li className="loading loading-ellipsis">Идет поиск</li>}
            {!(loadingData || loading) && (customResults || memoizedResults)}
          </ul>
        )}
        {!disabled && !isInput && (
          <div className="ui-search__loading">
            <div className="ui-search__search-icon">
              <SearchIcon />
            </div>
          </div>
        )}
        {!disabled && isInput && (
          <>
            <div className="ui-search__error" title="Ошибка в поле">
              <ErrorIcon />
            </div>
            <div className="ui-search__success" title="Поле заполнено верно">
              <SuccessIcon />
            </div>
          </>
        )}
        {successFormat && <div className="ui-search__i-error">{successFormat}</div>}
      </div>
    </div>
  );
}

export default React.memo(UISearch);
