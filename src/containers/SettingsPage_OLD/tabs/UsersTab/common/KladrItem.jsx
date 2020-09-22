import React from 'react';

const KladrItem = (props) => {
  const {
    name,
    item,
    callback,
  } = props || {};

  const {
    unrestricted_value: value,
  } = item || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(name, item);
    }
  }, [callback, name, item]);

  return (
    <li
      role="presentation"
      title={value}
      onMouseDown={handleClick}
      className="kladr-item"
    >
      {value}
    </li>
  );
};

export default KladrItem;
