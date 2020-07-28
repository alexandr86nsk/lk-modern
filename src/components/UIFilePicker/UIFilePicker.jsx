import React from 'react';
import './UIFilePicker.scss';
import FileIcon from '../../static/images/attach_file-24px.svg';


function UIFilePicker(props) {
  const {
    callback,
    title,
  } = props;

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
    <div className="ui-file-picker" title={title}>
      <FileIcon
        role="presentation"
        onClick={simulateInputClick}
      />
      <input
        ref={inputEl}
        id="mi"
        type="file"
        onChange={handleInputChange}
        accept=".csv"
      />
    </div>
  );
}

export default UIFilePicker;
