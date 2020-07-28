import React from 'react';

const colorSchema = {
  red: '#db2828',
  green: '#21ba45',
  blue: '#2185d0',
  teal: '#00b5ad',
};

function UIToast(props) {
  const {
    color,
    text,
    onDismissClick,
  } = props;

  return (
    <div className="ui-toast font-type-r-12" style={{ backgroundColor: colorSchema[color] }}>
      <p className="ui-toast__content">
        {text}
      </p>
      <button type="button" className="ui-toast__dismiss" onClick={onDismissClick}>
        x
      </button>
    </div>
  );
}

export default React.memo(UIToast);
