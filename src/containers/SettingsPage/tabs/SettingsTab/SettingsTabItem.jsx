import React from 'react';
import UIInput from '../../../../components/UIInputV2/UIInput';

function SettingsTabItem(props) {
  const {
    data,
    callback,
  } = props;

  const {
    id,
    description,
    maxLength,
    valType,
    value,
  } = data || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    if (callback) {
      callback({
        id: editName,
        value: editValue,
      });
    }
  }, [callback]);

  const memoizedMask = React.useMemo(() => {
    if (valType && maxLength) {
      const el = valType === 'INT' ? '0' : '*';
      return el.repeat(maxLength);
    }
    return null;
  }, [valType, maxLength]);

  return (
    <div className="settings-tab-item">
      <UIInput
        name={id}
        type="--style-1c"
        title={description}
        data={value}
        mask={memoizedMask}
        callback={handleChangeValue}
      />
    </div>
  );
}

export default React.memo(SettingsTabItem);
