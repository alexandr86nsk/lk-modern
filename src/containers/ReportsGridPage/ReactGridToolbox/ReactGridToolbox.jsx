import React from 'react';
import ReactGridToolboxItem from './ReactGridToolboxItem';

const ReactGridToolbox = (props) => {
  const { data = [] } = props || {};
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__list">
        {data.map((item) => (
          <ReactGridToolboxItem
            key={item.i}
            item={item}
            onTakeItem={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ReactGridToolbox);
