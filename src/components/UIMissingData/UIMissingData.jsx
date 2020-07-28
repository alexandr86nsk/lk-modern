import React from 'react';
import './UIMissingData.scss';

function UIMissingData(props) {
  const {
    type,
    title,
    icon,
  } = props;

  return (
    <div className={`ui-missing-data ${type}`}>
      <div className="ui-missing-data__body">
        {icon && <div className="ui-missing-data__icon">icon</div>}
        {title && <div className="ui-missing-data__title">{title}</div>}
      </div>
    </div>
  );
}

export default React.memo(UIMissingData);
