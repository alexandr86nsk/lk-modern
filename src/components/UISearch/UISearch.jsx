import React from 'react';
import './UISearch.scss';
import SearchIcon from './search-icon.svg';
import ClearIcon from './clear-icon.svg';

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
  } = props;

  const inputRef = React.useRef(null);
  const resultsEl = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [resultsStyle, setResultsStyle] = React.useState({
    top: 'calc(100% + 2px)',
    maxHeight: '300px',
  });

  const calculateStyle = React.useCallback(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      const inputCoords = input.getBoundingClientRect();
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
        inputRef.current.focus();
      }
    }
  }, [callback]);

  return (
    <div className={`ui-search${data ? ' active' : ''}${disabled ? ' disabled' : ''}${loading || loadingData ? ' loading' : ''}`}>
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
      {!disabled && (
      <div className="ui-search__icon">
        <SearchIcon />
      </div>
      )}
    </div>
  );
}

export default React.memo(UISearch);
