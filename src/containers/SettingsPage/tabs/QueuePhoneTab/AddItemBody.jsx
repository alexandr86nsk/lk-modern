import React from 'react';
import { connect } from 'react-redux';
import formGenerator from '../../../../components/utilities/formGenerator';
import actions from '../../../../redux/actions/actions';


function AddItemBody(props) {
  const {
    template,
    tempData,
    modalStoreSetTempDataValue,
  } = props;

  const renderContent = React.useMemo(
    () => formGenerator(template, tempData, modalStoreSetTempDataValue),
    [template, tempData, modalStoreSetTempDataValue],
  );

  return (
    <div className="queue-phone-tab__item">
      {renderContent}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tempData: state.modalStore.tempData,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(AddItemBody);
