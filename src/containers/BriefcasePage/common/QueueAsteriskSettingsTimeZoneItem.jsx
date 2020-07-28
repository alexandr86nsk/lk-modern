import React from 'react';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';

function QueueAsteriskSettingsTimeZoneItem(props) {
  const {
    data,
    callback,
  } = props;

  const {
    StopCall,
    StartCall,
    TimeZoneId,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (callback) {
      callback(
        TimeZoneId,
        editName,
        editValue,
      );
    }
  }, [TimeZoneId, callback]);


  const timeOptions = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i += 1) {
      arr.push({
        value: `${i < 10 ? `0${i}` : i}:00:00`,
        label: `${i < 10 ? `0${i}` : i}:00:00`,
      });
    }
    return arr;
  }, []);


  return (
    <div className="queue-settings__time-zone-item">
      <div className="time-zone-item__title">{`Часовой пояс: (+${TimeZoneId})`}</div>
      <div className="time-zone-item__body">
        <UIReactSelect
          type="--style-1c"
          title="Начало обзвона"
          name="StartCall"
          data={StartCall}
          callback={handleChangeValue}
          options={timeOptions}
        />
        <UIReactSelect
          type="--style-1c"
          title="Конец обзвона"
          name="StopCall"
          data={StopCall}
          callback={handleChangeValue}
          options={timeOptions}
        />
      </div>
    </div>
  );
}

export default React.memo(QueueAsteriskSettingsTimeZoneItem);
