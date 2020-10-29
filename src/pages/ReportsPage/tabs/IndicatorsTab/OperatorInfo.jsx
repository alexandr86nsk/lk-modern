import React from 'react';
import UILoader from '../../../../components/UILoader';
import UIInput from '../../../../components/UIInput/UIInput';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';

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
      {!loading && data && (
        <>
          <UIInput data={OperatorInCall} disabled type="--style-1c --transparent" title="Разговор:" />
          <UIInput data={OperatorInUpdate} disabled type="--style-1c --transparent" title="Поствызов:" />
          <UIInput data={OperatorInWaiting} disabled type="--style-1c --transparent" title="Ожидание:" />
        </>
      )}
      {!loading && !data && <UIMissingData />}
    </div>
  );
};

export default React.memo(OperatorInfo);
