import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIBlockTitle from '../../../components/UIBlockTitle/UIBlockTitle';
import UILoader from '../../../components/UILoader/UILoader';
import { settingsTabs } from '../settings';
import UITab from '../../../components/UITab/UITab';

function QueueAsteriskSettings(props) {
  const {
    id,
    briefcaseStoreGetQueueAsteriskSettings,
    briefcaseStoreGetQueueAsteriskSettingsCancel,
    queueAsteriskSettingsLoading,
    briefcaseStoreSaveTimeZoneSettingsCancel,
    briefcaseStoreSaveRecallSettingsCancel,
    briefcaseStoreSaveQueueAsteriskSettingsCancel,
  } = props;

  React.useEffect(() => {
    briefcaseStoreGetQueueAsteriskSettings(id);
  }, [id, briefcaseStoreGetQueueAsteriskSettings]);

  React.useEffect(() => () => {
    briefcaseStoreGetQueueAsteriskSettingsCancel();
    briefcaseStoreSaveTimeZoneSettingsCancel();
    briefcaseStoreSaveRecallSettingsCancel();
    briefcaseStoreSaveQueueAsteriskSettingsCancel();
  }, [
    briefcaseStoreGetQueueAsteriskSettingsCancel,
    briefcaseStoreSaveTimeZoneSettingsCancel,
    briefcaseStoreSaveRecallSettingsCancel,
    briefcaseStoreSaveQueueAsteriskSettingsCancel,
  ]);

  return (
    <div className="briefcase-list__queue-settings">
      <UIBlockTitle title={`Настройки группы: ${id}`} />
      <div className="queue-settings__body">
        {queueAsteriskSettingsLoading && (
          <div className="queue-settings__loader">
            <UILoader text="Загрузка настроек..." />
          </div>
        )}
        {!queueAsteriskSettingsLoading && (
          <UITab
            tabs={settingsTabs}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  queueAsteriskSettingsLoading: state.briefcaseListStore.queueAsteriskSettingsLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(QueueAsteriskSettings);
