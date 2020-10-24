import React from 'react';
import UIInput from '../../../../components/UIInput/UIInput';

function QueuePhoneItem(props) {
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

  return (
    <div className="queue-phone-item">
      <UIInput
        title="Номер очереди"
        data={data.QueuePhone}
        disabled
      />
      <UIInput
        title="Кол-во линий"
        name="QueueLimitCoefficient"
        data={data.QueueLimitCoefficient}
        callback={handleChangeValue}
        mask="000"
      />
    </div>
  );
}

export default React.memo(QueuePhoneItem);
