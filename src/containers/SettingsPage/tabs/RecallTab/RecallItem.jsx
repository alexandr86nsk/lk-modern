import React from 'react';
import UIInput from '../../../../components/UIInput/UIInput';

const status = {
  Busy: 'Абонент занят',
  NotAvailable: 'Абонент недоступен',
  NoAnswered: 'Абонент не отвечает',
  'Subscriber absent': 'Абонент отсутствует',
  'Call Rejected': 'Вызов отклонен',
  NoSuchNumber: 'Неверный формат номера',
};

function RecallItem(props) {
  const {
    data,
    callback,
  } = props || {};

  const {
    EventCode,
    EventType,
    CountRetry,
    Interval,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    callback(EventCode, editName, editValue);
  }, [callback, EventCode]);

  return (
    <div className="recall-item item">
      <div className="item__title">{status[EventType] || EventType}</div>
      <div className="item__body">
        <UIInput
          title="Количество попыток"
          data={CountRetry}
          name="CountRetry"
          callback={handleChangeValue}
          mask="000"
          type="--style-1c --transparent"
        />
        <UIInput
          title="Интервал"
          data={Interval}
          name="Interval"
          callback={handleChangeValue}
          mask="000"
          type="--style-1c --transparent"
        />
      </div>
    </div>
  );
}

export default React.memo(RecallItem);
