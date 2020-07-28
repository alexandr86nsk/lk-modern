import React from 'react';
import './UIBlockTitle.scss';


function UIBlockTitle(props) {
  const {
    title = '',
    fontSize = '15',
  } = props;
  return (
    <div className={`ui-block-title font-type-b-${fontSize}`}>{title}</div>
  );
}

export default React.memo(UIBlockTitle);
