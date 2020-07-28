import React from 'react';
import './UIHint.scss';
import { Popup } from 'semantic-ui-react';

function UIHint({ text, icon }) {
  return (
    <div className="ui-hint">
      <Popup
        content={text}
        trigger={<div className="ui-hint__icon">{icon}</div>}
        basic
      />
    </div>
  );
}

export default React.memo(UIHint);
