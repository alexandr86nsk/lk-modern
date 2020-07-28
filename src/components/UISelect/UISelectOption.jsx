import React from 'react';

const UISelectOption = (props) => {
  const { option = '', callback = (f) => f } = props;
  const handleClick = () => {
    callback(option);
  };

  return (
    <li
      role="presentation"
      onClick={handleClick}
    >
      {option}
    </li>
  );
};

export default React.memo(UISelectOption);
