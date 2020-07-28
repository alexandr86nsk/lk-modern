import React from 'react';
import './UILoader.scss';

function UILoader(props) {
  const {
    size = '',
    text = '',
    type = '',
  } = props;

  return (
    <div className={`ui-loader ${size} ${type} ${text ? 'text' : ''}`}>
      {text}
    </div>
  );
}

export default React.memo(UILoader);
