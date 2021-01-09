import React from 'react';

import './style.scss';
import { UIBlockTitle } from '@components/UIBlockTitle';

/*import inputsTemplate from './common/settings';*/

// import generateFormElements from '../../spinners/utils/generateFormElements';

export function InputTestPage() {
  /*  const { testStore, testStoreSetSection } = props || {};

  const handleChangeValue = React.useCallback(
    (editName, editValue) => {
      testStoreSetSection({
        [editName]: editValue,
      });
    },
    [testStoreSetSection]
  );*/

  /*const renderInputs = React.useMemo(
    () => generateFormElements(inputsTemplate, testStore, handleChangeValue),
    [testStore, handleChangeValue],
  );*/

  return (
    <div className="input-test-page">
      <UIBlockTitle title="Inputs" />
      {/*<div className="test-block">{renderInputs}</div>*/}
    </div>
  );
}
