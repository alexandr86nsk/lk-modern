import React from 'react';
import UITextField from '../../../../components/UITextField/UITextField';
import UIReactSelect from '../../../../components/UIReactSelect/UIReactSelect';

function TimeZoneItem(props) {
  const {
    data = {},
    callback = (f) => f,
  } = props;

  const handleChangeValue = React.useCallback((editName, editValue) => {
    callback({
      ...data,
      [editName]: editValue,
    });
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
    <div className="time-zone-item">
      <UITextField type="inline" data={`${data.CityName} (${data.TimeZone})`} />
      <UIReactSelect
        placeholder="Начало обзвона"
        name="StartCall"
        data={data.StartCall}
        callback={handleChangeValue}
        options={timeOptions}
      />
      <UIReactSelect
        placeholder="Конец обзвона"
        name="StopCall"
        data={data.StopCall}
        callback={handleChangeValue}
        options={timeOptions}
      />
    </div>
  );
}

export default React.memo(TimeZoneItem);
