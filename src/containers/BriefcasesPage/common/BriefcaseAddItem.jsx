import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIInput from '../../../components/UIInput/UIInput';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';

function BriefcaseAddItem(props) {
  const {
    tempData,
    modalStoreSetTempDataValue,
    queueAsteriskOptions,
    queueAsteriskOptionsLoading,
  } = props;

  const { name, selectedQueueAsterisk } = tempData || {};

  return (
    <div className="briefcase-list__add-modal">
      <UIInput
        title="Название кампании:"
        name="name"
        data={name}
        callback={modalStoreSetTempDataValue}
      />
      <UIReactSelect
        title="Очередь"
        options={queueAsteriskOptions}
        name="selectedQueueAsterisk"
        data={selectedQueueAsterisk}
        callback={modalStoreSetTempDataValue}
        isLoading={queueAsteriskOptionsLoading}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  tempData: state.modalStore.tempData,
  queueAsteriskOptions: state.briefcaseListStore.queueAsteriskOptions,
  queueAsteriskOptionsLoading: state.briefcaseListStore.queueAsteriskOptionsLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcaseAddItem);
