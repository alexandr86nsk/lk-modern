import React from 'react';
import './UIElementTitle.scss';

function UIElementTitle(props) {
  const {
    title = '',
  } = props;
  return (
    <div className="ui-element-title">{title}</div>
  );
}

export default React.memo(UIElementTitle);
