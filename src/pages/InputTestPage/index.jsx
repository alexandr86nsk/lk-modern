import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import formGenerator from '../../components/utilities/formGenerator';
import inputsTemplate from './common/settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';

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
    () => formGenerator(inputsTemplate, testStore, handleChangeValue),
    [testStore, handleChangeValue],
  );

  return (
    <div className="input-test-page">
      <UIBlockTitle title="Inputs" />
      {renderInputs}
    </div>
  );
}

const mapStateToProps = (state) => ({
  testStore: state.testStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(InputTestPage);
