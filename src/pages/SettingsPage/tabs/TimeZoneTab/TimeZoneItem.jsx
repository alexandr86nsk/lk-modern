import React from 'react';
import UIReactSelect from '../../../../components/UIReactSelect/UIReactSelect';

function TimeZoneItem(props) {
  const {
    data,
    callback,
  } = props || {};

  const {
    CityName,
    TimeZone,
    StartCall,
    StopCall,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (callback) {
      callback({
        ...data,
        [editName]: editValue,
      });
    }
  }, [data, callback]);

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
    <div className="time-zone-item item">
      <div className="item__title">{`${CityName} (${TimeZone})`}</div>
      <div className="item__body">
        <UIReactSelect
          title="Начало обзвона"
          name="StartCall"
          data={StartCall}
          callback={handleChangeValue}
          options={timeOptions}
          type="--style-1c --transparent"
        />
        <UIReactSelect
          title="Конец обзвона"
          name="StopCall"
          data={StopCall}
          callback={handleChangeValue}
          options={timeOptions}
          type="--style-1c --transparent"
        />
      </div>
    </div>
  );
}

export default React.memo(TimeZoneItem);
