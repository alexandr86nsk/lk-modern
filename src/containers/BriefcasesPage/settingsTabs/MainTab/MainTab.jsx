import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import QueueAsteriskSettingsRecallItem from '../../common/QueueAsteriskSettingsRecallItem';
import QueueAsteriskSettingsTimeZoneItem from '../../common/QueueAsteriskSettingsTimeZoneItem';
import QueueAsteriskSettingItem from '../../common/QueueAsteriskSettingItem';
import formGenerator from '../../../../components/utilities/formGenerator';
import queueAsteriskSettingsTemplate from './settings';

function MainTab(props) {
  const {
    queueAsteriskRetryRulesSettings,
    trySaveQueueAsteriskRetryRulesSettings,
    queueAsteriskTimeZoneSettings,
    trySaveQueueAsteriskTimeZoneSettings,
    queueAsteriskSettings,
    trySaveQueueAsteriskSettings,
    queueAsteriskControlTypes,
    briefcasesStoreChangeRecallSettings,
    briefcasesStoreChangeTimeZoneSettings,
    briefcasesStoreChangeQueueAsteriskSettings,
    briefcasesStoreSaveTimeZoneSettings,
    briefcasesStoreSaveRecallSettings,
    briefcasesStoreSaveQueueAsteriskSettings,
  } = props || {};

  const {
    QueueLimitCoefficient,
    QueueLimitCoefficientPerOperatorMax,
    QueueLimitCoefficientPerOperatorMin,
    ControlType,
    Work,
    AcceptPercentLostCalls,
  } = queueAsteriskSettings || {};

  const handleChangeRecallValue = React.useCallback((editId, editName, editValue) => {
    briefcasesStoreChangeRecallSettings({
      id: editId,
      name: editName,
      value: editValue,
    });
  }, [briefcasesStoreChangeRecallSettings]);

  const handleChangeTimeZoneValue = React.useCallback((editId, editName, editValue) => {
    briefcasesStoreChangeTimeZoneSettings({
      id: editId,
      name: editName,
      value: editValue,
    });
  }, [briefcasesStoreChangeTimeZoneSettings]);

  const handleChangeQueueAsteriskSettingsValue = React.useCallback((editName, editValue) => {
    briefcasesStoreChangeQueueAsteriskSettings({
      [editName]: editValue,
    });
  }, [briefcasesStoreChangeQueueAsteriskSettings]);

  const handleSaveRecallSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveRecallSettings(queueAsteriskRetryRulesSettings);
  }, [queueAsteriskRetryRulesSettings, briefcasesStoreSaveRecallSettings]);

  const handleSaveTimeZoneSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveTimeZoneSettings(queueAsteriskTimeZoneSettings);
  }, [queueAsteriskTimeZoneSettings, briefcasesStoreSaveTimeZoneSettings]);

  const handleSaveQueueAsteriskSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveQueueAsteriskSettings(queueAsteriskSettings);
  }, [queueAsteriskSettings, briefcasesStoreSaveQueueAsteriskSettings]);

  const editedQueueAsteriskSettingsTemplate = React.useMemo(
    () => queueAsteriskSettingsTemplate.map((v) => {
      if (v.id === 5) {
        return {
          ...v,
          options: queueAsteriskControlTypes,
        };
      }
      return v;
    }), [queueAsteriskControlTypes],
  );

  const queueAsteriskSettingsBody = React.useMemo(
    () => {
      if (queueAsteriskSettings) {
        return formGenerator(
          editedQueueAsteriskSettingsTemplate,
          queueAsteriskSettings,
          handleChangeQueueAsteriskSettingsValue,
        );
      }
      return null;
    }, [
      editedQueueAsteriskSettingsTemplate,
      queueAsteriskSettings,
      handleChangeQueueAsteriskSettingsValue,
    ],
  );
  return (
    <div className="queue-settings__main-tab">
      <div className="queue-settings__table">
        <QueueAsteriskSettingItem
          title="Настройки перезвона"
          saveCallback={handleSaveRecallSettings}
          trySave={trySaveQueueAsteriskRetryRulesSettings}
          body={queueAsteriskRetryRulesSettings
          && Array.isArray(queueAsteriskRetryRulesSettings)
          && queueAsteriskRetryRulesSettings.map((v) => {
            const { EventCode } = v || {};
            return (
              <QueueAsteriskSettingsRecallItem
                key={EventCode}
                data={v}
                callback={handleChangeRecallValue}
              />
            );
          })}
        />
        <QueueAsteriskSettingItem
          title="Настройки часовых поясов"
          saveCallback={handleSaveTimeZoneSettings}
          trySave={trySaveQueueAsteriskTimeZoneSettings}
          body={queueAsteriskTimeZoneSettings
          && Array.isArray(queueAsteriskTimeZoneSettings)
          && queueAsteriskTimeZoneSettings.map((v) => {
            const { TimeZoneId } = v || {};
            return (
              <QueueAsteriskSettingsTimeZoneItem
                key={TimeZoneId}
                data={v}
                callback={handleChangeTimeZoneValue}
              />
            );
          })}
        />
        <div className="queue-settings__queue-asterisk-item">
          <QueueAsteriskSettingItem
            title="Другие настройки"
            saveCallback={handleSaveQueueAsteriskSettings}
            trySave={trySaveQueueAsteriskSettings}
            body={queueAsteriskSettingsBody}
            disableSaveButton={!(QueueLimitCoefficient || QueueLimitCoefficient === 0)
            || !(QueueLimitCoefficientPerOperatorMax || QueueLimitCoefficientPerOperatorMax === 0)
              || !(QueueLimitCoefficientPerOperatorMin || QueueLimitCoefficientPerOperatorMin === 0)
              || !(ControlType || ControlType === 0)
              || !(Work || Work === 0)
              || !(AcceptPercentLostCalls || AcceptPercentLostCalls === 0)}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  queueAsteriskRetryRulesSettings: state.briefcasesStore.queueAsteriskRetryRulesSettings,
  trySaveQueueAsteriskRetryRulesSettings: state.briefcasesStore.trySaveQueueAsteriskRetryRulesSettings,
  queueAsteriskTimeZoneSettings: state.briefcasesStore.queueAsteriskTimeZoneSettings,
  trySaveQueueAsteriskTimeZoneSettings: state.briefcasesStore.trySaveQueueAsteriskTimeZoneSettings,
  queueAsteriskSettings: state.briefcasesStore.queueAsteriskSettings,
  trySaveQueueAsteriskSettings: state.briefcasesStore.trySaveQueueAsteriskSettings,
  queueAsteriskControlTypes: state.briefcasesStore.queueAsteriskControlTypes,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
