import React from 'react';
import './UISemanticCheckbox.scss';
import { Checkbox } from 'semantic-ui-react';

function UISemanticCheckbox(props) {
  const {
    name,
    data,
    callback,
    title,
    disabled,
    type,
    readOnly,
    radio,
    toggle,
  } = props || {};

  const handleChange = React.useCallback((e, value) => {
    const {
      checked,
    } = value || {};
    if (callback) {
      callback(name, checked);
    }
  }, [callback, name]);

  const className = React.useMemo(() => {
    let str = 'ui-semantic-checkbox';
    if (readOnly) {
      str = `${str} read-only`;
    }
    if (type) {
      str = `${str} ${type}`;
    }
    return str;
  }, [
    type,
    readOnly,
  ]);

  return (
    <div className={className}>
      {title && type === '--style-1c'
      && (
        <div className="ui-semantic-checkbox__title-wrapper">
          <div className="ui-semantic-checkbox__title">
            <span className="ellipsis-element">
              {title}
            </span>
          </div>
        </div>
      )}
      <div className="ui-semantic-checkbox__body">
        <div className="ui-semantic-checkbox__checkbox">
          <Checkbox
            disabled={disabled}
            radio={radio}
            label={type !== '--style-1c' ? title : null}
            toggle={toggle}
            onChange={handleChange}
            readOnly={readOnly}
            checked={data}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UISemanticCheckbox);
