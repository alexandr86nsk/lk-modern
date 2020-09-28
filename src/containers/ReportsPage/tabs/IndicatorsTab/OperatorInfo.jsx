import React from 'react';
import UITextField from '../../../../components/UITextField/UITextField';
import UILoader from '../../../../components/UILoader/UILoader';
import UIInput from '../../../../components/UIInput/UIInput';

const OperatorInfo = (props) => {
  const {
    data,
    loading,
  } = props || {};

  const {
    OperatorInUpdate,
    OperatorInCall,
    OperatorInWaiting,
  } = data || {};

  return (
    <div className="operator-info">
      {loading && <UILoader type="--google" dimmed />}
      <UIInput data={OperatorInCall} disabled type="--style-1c --transparent" title="Разговор:" />
      <UIInput data={OperatorInUpdate} disabled type="--style-1c --transparent" title="Поствызов:" />
      <UIInput data={OperatorInWaiting} disabled type="--style-1c --transparent" title="Ожидание:" />
    </div>
  );
};

export default OperatorInfo;
