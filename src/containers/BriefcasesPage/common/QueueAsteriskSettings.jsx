import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import { settingsTabs } from '../settings';
import UITab from '../../../components/UITab/UITab';

function QueueAsteriskSettings(props) {
  const {
    id,
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
    <UITab
      tabs={settingsTabs}
    />
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(QueueAsteriskSettings);
