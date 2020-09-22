import React from 'react';
import UIInput from '../../../components/UIInput/UIInput';

const status = {
  0: 'Неверный формат номера',
  1: 'Абонент не отвечает',
  5: 'Абонент занят',
  8: 'Абонент недоступен',
};

function QueueAsteriskSettingsRecallItem(props) {
  const {
    data,
    callback,
  } = props;

  const {
    CountRetry,
    EventCode,
    Interval,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (callback) {
      callback(EventCode, editName, editValue);
    }
  }, [callback, EventCode]);

  return (
    <div className="queue-settings__recall-item">
      <div className="recall-item__title">{status[EventCode] || EventCode}</div>
      <div className="recall-item__body">
        <UIInput
          type="--style-1c"
          title="Количество попыток"
          data={CountRetry}
          name="CountRetry"
          callback={handleChangeValue}
          mask="000"
        />
        <UIInput
          type="--style-1c"
          title="Интервал"
          data={Interval}
          name="Interval"
          callback={handleChangeValue}
          mask="000"
        />
      </div>
    </div>
  );
}

export default React.memo(QueueAsteriskSettingsRecallItem);
