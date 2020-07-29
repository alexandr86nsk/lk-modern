import React from 'react';
import './UIMissingData.scss';
import WarningIcon from '../../static/images/warning-24px.svg';

function UIMissingData(props) {
  const {
    type,
    title = 'Данные не загружены. Пожалуйста обновите страницу',
    icon = <WarningIcon />,
  } = props || {};

  return (
    <div className={`ui-missing-data ${type}`}>
      <div className="ui-missing-data__body">
        {icon && <div className="ui-missing-data__icon">{icon}</div>}
        {title && <div className="ui-missing-data__title">{title}</div>}
      </div>
    </div>
  );
}

export default React.memo(UIMissingData);
