import React from 'react';

const ReactGridToolboxItem = (props) => {
  const { data } = props || {};
  return (
    <div
      role="presentation"
      className="toolbox__item"
      onClick={() => {}}
    >
      {data}
    </div>
  );
};

export default React.memo(ReactGridToolboxItem);
