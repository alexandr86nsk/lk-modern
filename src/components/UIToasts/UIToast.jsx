import React from 'react';
import SuccessIcon from './check-icon.svg';
import ErrorIcon from './error-icon.svg';

function UIToast(props) {
  const {
    type,
    text,
    onDismissClick,
  } = props;

  const parseValue = React.useCallback((value) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseValue(v));
    }
    if (typeof value !== 'string' && Array.isArray(Object.keys(value))) {
      return Object.keys(value).map((v) => parseValue(value[v]));
    }
    return (<li key={value}>{value}</li>);
  }, []);

  const generateContent = React.useMemo(() => {
    if (text) {
      return (<ul>{parseValue(text)}</ul>);
    }
    return '';
  }, [parseValue, text]);

  return (
    <div className={`ui-toast${type ? ` ${type}` : ''}`}>
      <div className="ui-toast__icon">
        {type === 'success' && <SuccessIcon />}
        {type === 'error' && <ErrorIcon />}
      </div>
      <div className="ui-toast__content">
        <div className="ui-toast__title">
          {type === 'success' && 'Успешно.'}
          {type === 'error' && 'Ошибка.'}
        </div>
        {generateContent}
      </div>
      <button type="button" className="ui-toast__dismiss" onClick={onDismissClick}>
        x
      </button>
    </div>
  );
}

export default React.memo(UIToast);
