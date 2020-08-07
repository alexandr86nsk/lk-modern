import React from 'react';
import './ZoneInfoItem.scss';

function ZoneInfoItem(props) {
  const {
    title,
    value,
  } = props || {};

  return (
    <div className="info__item">
      <div className="title">
        {title}
      </div>
      <div className="value">
        {value}
      </div>
    </div>
  );
}

export default React.memo(ZoneInfoItem);
