import React from 'react';
import './UISemanticCheckbox.scss';
import { Checkbox } from 'semantic-ui-react';

interface IUISemanticCheckboxProps {
  title?: string;
  name: string;
  callback: (name: string, value: boolean) => void;
  data: boolean;
  disabled?: boolean;
  type?: string,
  readOnly?: boolean;
  radio?: boolean;
  toggle?: boolean;
}

function UISemanticCheckbox(props: IUISemanticCheckboxProps) {
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

  const handleChange = React.useCallback((e, value: { checked?: boolean }) => {
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
        <div className="ui-semantic-checkbox__title">
          <div className="ui-semantic-checkbox__title-content" title={title}>
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
            checked={!!data}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UISemanticCheckbox);
