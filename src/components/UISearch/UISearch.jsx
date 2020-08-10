import React from 'react';
import './UISearch.scss';
import SearchIcon from './search-icon.svg';
import ClearIcon from './clear-icon.svg';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './check-icon.svg';

function UISearch(props) {
  const {
    placeholder = 'Поиск',
    results = [],
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
    title,
  } = props || {};

  const inputRef = React.useRef(null);
  const resultsEl = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [resultsStyle, setResultsStyle] = React.useState({
    top: 'calc(100% + 2px)',
    maxHeight: '300px',
  });

  const calculateStyle = React.useCallback(() => {
    const { current } = inputRef || {};
    if (current) {
      const inputCoords = current.getBoundingClientRect();
      const { bottom, top } = inputCoords;
      if (window.innerHeight - 107 - bottom < 350 && top > 360) {
        setResultsStyle({
          bottom: 'calc(100% + 2px)',
          maxHeight: '300px',
        });
      }
    }
  }, []);

  React.useEffect(() => {
    calculateStyle();
  }, [calculateStyle]);

  const onWheel = React.useCallback((e) => {
    if (e.target && e.target.contains(inputRef.current)) {
      calculateStyle();
      e.stopPropagation();
    }
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
      if (!searchServerSide) {
        setLoading(true);
        setTimeout(() => setLoading(false), 300);
      }
      callback(event.target.value);
    }
  }, [searchServerSide, callback]);

  const memoizedResults = React.useMemo(() => {
    if (results.length) {
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
      callback('');
      if (inputRef) {
        const { current } = inputRef || {};
        current.focus();
      }
    }
  }, [callback]);

  const className = React.useMemo(() => {
    let str = 'ui-search';
    if (disabled) {
      str = `${str} disabled`;
    }
    if (type) {
      str = `${str} ${type}`;
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
        {/* && (!searchServerSide ? !loading : !loadingData) */}
        {data && !hideResults && (
          <ul className="ui-search__results" ref={resultsEl} style={resultsStyle}>
            {customResults || memoizedResults}
          </ul>
        )}
        {data && !disabled && (
          <div role="presentation" className="ui-search__clear" title="Очистить" onClick={handleClear}>
            <ClearIcon />
          </div>
        )}
        {!disabled && !asInput && (
          <div className="ui-search__search-icon">
            <SearchIcon />
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
