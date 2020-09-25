import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import { settingsTabs } from '../settings';
import UITab from '../../../components/UITab/UITab';
import UILoader from '../../../components/UILoader/UILoader';

function QueueAsteriskEditor(props) {
  const {
    id,
    queueInfoLoading,
    briefcasesStoreGetQueueAsteriskSettings,
    briefcasesStoreGetQueueAsteriskSettingsCancel,
    briefcasesStoreSaveTimeZoneSettingsCancel,
    briefcasesStoreSaveRecallSettingsCancel,
    briefcasesStoreSaveQueueAsteriskSettingsCancel,
  } = props || {};

  React.useEffect(() => {
    briefcasesStoreGetQueueAsteriskSettings(id);
  }, [id, briefcasesStoreGetQueueAsteriskSettings]);

  React.useEffect(() => () => {
    briefcasesStoreGetQueueAsteriskSettingsCancel();
    briefcasesStoreSaveTimeZoneSettingsCancel();
    briefcasesStoreSaveRecallSettingsCancel();
    briefcasesStoreSaveQueueAsteriskSettingsCancel();
  }, [
    briefcasesStoreGetQueueAsteriskSettingsCancel,
    briefcasesStoreSaveTimeZoneSettingsCancel,
    briefcasesStoreSaveRecallSettingsCancel,
    briefcasesStoreSaveQueueAsteriskSettingsCancel,
  ]);

  return (
    <div className="briefcases-page__edit-queue-popup popup">
      <div className="popup__title">
        <span className="ellipsis-element">Редактирование очереди</span>
      </div>
      <div className="popup__body">
        {queueInfoLoading && (
          <div className="popup__loader">
            <UILoader text="Загрузка данных" />
          </div>
        )}
        {!queueInfoLoading && (
          <UITab
            tabs={settingsTabs}
          />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(QueueAsteriskEditor);
