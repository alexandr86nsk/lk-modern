import React from 'react';
import './UICheckbox.scss';


function UICheckbox(props) {
  const {
    name = '',
    data = false,
    callback,
    title = '',
    hint = '',
    disabled,
  } = props;

  const inputEl = React.useRef(null);

  const handleClick = React.useCallback(() => {
    if (!disabled) {
      inputEl.current.click();
    }
  }, [disabled]);

  const handleChange = React.useCallback(() => {
    if (callback) {
      callback(name, !data);
    }
  }, [callback, data, name]);

  return (
    <div className="ui-checkbox">
      <div className={`ui-checkbox__content ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          ref={inputEl}
          checked={!!data}
          onChange={handleChange}
        />
        <div role="presentation" className="checkbox" onClick={handleClick} title={hint}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695
             18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305
              1.8954305,1 3,1 Z"
            />
            <polyline points="4 11 8 15 16 6" />
          </svg>
        </div>
      </div>
      {title && (
        <div className="ui-checkbox__title ellipsis-element">{title}</div>
      )}
    </div>
  );
}

export default React.memo(UICheckbox);
