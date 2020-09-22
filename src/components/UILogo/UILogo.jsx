import React from 'react';
import './UILogo.scss';
import logo from '../../static/images/logo.png';

function UILogo(props) {
  const { type } = props || {};
  return (
    <div className={`ui-logo${type ? ` ${type}` : ''}`}>
      <div className="ui-logo__image">
        <img src={logo} alt="logo" />
      </div>
      <div className="ui-logo__title">
        <span>Asterisk</span>
        <span>dialer</span>
      </div>
    </div>
  );
}

export default React.memo(UILogo);
