import React from 'react';
import UIInput from '../../../../components/UIInput/UIInput';
import UITextField from '../../../../components/UITextField/UITextField';


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
  } = props;

  const handleChangeValue = React.useCallback((editName, editValue) => {
    callback(data.EventCode, editName, editValue);
  }, [callback, data.EventCode]);

  return (
    <div className="recall-item">
      <UITextField type="underline" data={status[data.EventType] || data.EventType} />
      <UIInput
        title="Количество попыток"
        data={data.CountRetry}
        name="CountRetry"
        callback={handleChangeValue}
        mask="000"
      />
      <UIInput
        title="Интервал"
        data={data.Interval}
        name="Interval"
        callback={handleChangeValue}
        mask="000"
      />
    </div>
  );
}

export default React.memo(RecallItem);
