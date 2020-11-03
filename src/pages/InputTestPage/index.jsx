import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import inputsTemplate from './common/settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import generateFormElements from '../../components/utilities/generateFormElements';

function InputTestPage(props) {
  const {
    testStore,
    testStoreSetSection,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    testStoreSetSection({
      [editName]: editValue,
    });
  }, [testStoreSetSection]);

  const renderInputs = React.useMemo(
    () => generateFormElements(inputsTemplate, testStore, handleChangeValue),
    [testStore, handleChangeValue],
  );

  return (
    <div className="input-test-page">
      <UIBlockTitle title="Inputs" />
      <div className="test-block">{renderInputs}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  testStore: state.testStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(InputTestPage);
