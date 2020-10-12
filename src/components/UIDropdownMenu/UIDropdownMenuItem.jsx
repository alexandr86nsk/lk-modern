import React from 'react';
import './UIDropdownMenu.scss';
import { Dropdown } from 'semantic-ui-react';

function UIDropdownMenuItem(props) {
  const {
    title,
    callback,
    value,
    ...otherProps
  } = props || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(value);
    }
  }, [callback, value]);

  return (
    <Dropdown.Item
      title={title}
      text={title}
      onClick={handleClick}
      {...otherProps}
    />
  );
}

export default React.memo(UIDropdownMenuItem);
