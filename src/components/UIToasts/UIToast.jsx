import React from 'react';

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
      <div className="ui-toast__content">
        {generateContent}
      </div>
      <button type="button" className="ui-toast__dismiss" onClick={onDismissClick}>
        x
      </button>
    </div>
  );
}

export default React.memo(UIToast);
