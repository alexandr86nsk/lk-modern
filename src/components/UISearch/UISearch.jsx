import React from 'react';
import './UISearch.scss';
import SearchIcon from './search-icon.svg';
import ClearIcon from './clear-icon.svg';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

const topStyle = {
  top: 'calc(100% + 2px)',
  maxHeight: '160px',
};

const bottomStyle = {
  bottom: 'calc(100% + 2px)',
  maxHeight: '160px',
};

function UISearch(props) {
  const {
    placeholder = 'Поиск',
    results,
    customResults,
    hideResults,
    callback,
    data,
    searchServerSide,
    loadingData,
    disabled,
    maxLength,
    required,
    type,
    asInput,
    successFormat,
    name,
    title,
  } = props || {};

  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [resultsStyle, setResultsStyle] = React.useState(topStyle);

  const calculateStyle = React.useCallback(() => {
    const { current } = inputRef || {};
    if (current) {
      const inputCoords = current.getBoundingClientRect();
      const { bottom, top } = inputCoords;
      if (window.innerHeight - bottom < 165 && top > 165) {
        setResultsStyle(bottomStyle);
      } else {
        setResultsStyle(topStyle);
      }
    }
  }, []);

  React.useEffect(() => {
    calculateStyle();
  }, [calculateStyle]);

  const onWheel = React.useCallback(() => {
    calculateStyle();
  }, [calculateStyle]);

  React.useEffect(() => {
    if (!hideResults) {
      document.addEventListener('wheel', onWheel);
      return () => {
        document.removeEventListener('wheel', onWheel);
      };
    }
    return undefined;
  }, [hideResults, onWheel]);

  const handleChangeInput = React.useCallback((event) => {
    if (callback) {
      const { target } = event || {};
      const { value } = target || {};
      if (!searchServerSide) {
        setLoading(true);
        setTimeout(() => setLoading(false), 300);
      }
      callback(name, value);
    }
  }, [name, searchServerSide, callback]);

  const memoizedResults = React.useMemo(() => {
    if (results && Array.isArray(results) && results.length) {
      return results.map((v) => (
        <li key={v.id}>{v}</li>
      ));
    }
    return (
      <li>Поиск не дал результатов</li>
    );
  }, [results]);

  const handleClear = React.useCallback(() => {
    if (callback) {
      callback(name, null);
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
    if (asInput) {
      str = `${str} input`;
    }
    if (loading || loadingData) {
      str = `${str} loading`;
    }
    if (required) {
      str = `${str} required`;
      if (!data && data !== 0) {
        str = `${str} error`;
      }
    }
    if (data || data === 0) {
      str = `${str} active`;
    } else {
      str = `${str} empty`;
    }
    return str;
  }, [
    asInput,
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
            {required && !disabled && <div className="required-icon">*</div>}
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
          value={data || ''}
          onChange={handleChangeInput}
          disabled={disabled}
          maxLength={maxLength}
        />
        {data && !hideResults && (
          <ul className="ui-search__results" style={resultsStyle}>
            {customResults || memoizedResults}
          </ul>
        )}
        {!disabled && !asInput && (
          <div className="ui-search__loading">
            <div className="ui-search__search-icon">
              <SearchIcon />
            </div>
          </div>
        )}
        {!disabled && asInput && (
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
