import React from 'react';
import './UITextArea.scss';


function UITextArea(props) {
  const {
    title,
    name,
    data,
    callback,
    minLength = 0,
    disabled = false,
    vertical = false,
  } = props;

  const handleChange = React.useCallback((event) => {
    if (callback) {
      callback(name, event.target.value, event.keyCode);
    }
  }, [callback, name]);

  return (
    <div className={`ui-textarea ${data && data.length < minLength ? 'error' : ''}`}>
      {title
      && (
      <div className="ui-textarea__title font-type-b-10">
        <span className="ellipsis-element">{title}</span>
      </div>
      )}
      <textarea
        className={`ui-textarea__textarea ${vertical ? 'vertical' : ''} ${disabled ? 'disabled' : ''}`}
        onChange={handleChange}
        value={(data === 0 || data) ? data : ''}
        disabled={disabled}
      />
    </div>
  );
}


export default React.memo(UITextArea);
