import React from 'react';
import './UIBlockTitle.scss';

function UIBlockTitle(props) {
  const {
    title = '',
  } = props;
  return (
    <div className="ui-block-title">
      <div className="ui-block-title__main">{title}</div>
      <div className="ui-block-title__sub">{`Вы находитесь в панели ${title}`}</div>
    </div>
  );
}

export default React.memo(UIBlockTitle);
