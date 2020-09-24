import React from 'react';
import './UIRsuiteTableFilePicker.scss';

function UIRsuiteTableFilePicker(props) {
  const {
    callback,
    title,
    icon = 'attach',
    fileTypes = '*',
    isButton,
    hideTitle,
  } = props || {};

  const inputEl = React.useRef(null);

  const handleInputChange = React.useCallback((event) => {
    callback(Array.from(event.target.files));
    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  }, [callback]);

  const simulateInputClick = React.useCallback(() => {
    inputEl.current.click();
  }, []);

  return (
    <div
      role="presentation"
      className={`ui-rsuite-table__file-picker ${isButton ? `ui circular${hideTitle ? ' icon' : ''} button` : 'context-menu__item'}`}
      onClick={simulateInputClick}
      title={title}
    >
      <i className={`${icon} icon`} aria-hidden />
      {!isButton && <span className="text" aria-hidden>{title}</span>}
      {isButton && !hideTitle && title}
      <input
        ref={inputEl}
        type="file"
        onChange={handleInputChange}
        accept={fileTypes}
      />
    </div>
  );
}

export default UIRsuiteTableFilePicker;
