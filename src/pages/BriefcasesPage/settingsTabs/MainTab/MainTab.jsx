import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import QueueSettingsRecallItem from '../../common/QueueSettingsRecallItem';
import QueueSettingsTimeZoneItem from '../../common/QueueSettingsTimeZoneItem';
import QueueSettingItem from '../../common/QueueSettingsItem';
import formGenerator from '../../../../components/utils/formGenerator';
import queueMainSettingsTemplate from './settings';

function MainTab(props) {
  const {
    queueId,
    queueControlTypes,
    loadingQueueControlTypes,
    queueMainSettings,
    loadingQueueMainSettings,
    trySaveQueueMainSettings,
    queueRecallSettings,
    loadingQueueRecallSettings,
    trySaveQueueRecallSettings,
    queueTimeZoneSettings,
    loadingQueueTimeZoneSettings,
    trySaveQueueTimeZoneSettings,
    briefcasesStoreGetMainSettings,
    briefcasesStoreGetRecallSettings,
    briefcasesStoreGetTimeZoneSettings,
    briefcasesStoreGetMainSettingsCancel,
    briefcasesStoreGetRecallSettingsCancel,
    briefcasesStoreGetTimeZoneSettingsCancel,
    briefcasesStoreChangeMainSettings,
    briefcasesStoreChangeRecallSettings,
    briefcasesStoreChangeTimeZoneSettings,
    briefcasesStoreSaveMainSettings,
    briefcasesStoreSaveRecallSettings,
    briefcasesStoreSaveTimeZoneSettings,
  } = props || {};

  const {
    QueueLimitCoefficient,
    QueueLimitCoefficientPerOperatorMax,
    QueueLimitCoefficientPerOperatorMin,
    ControlType,
    Work,
    AcceptPercentLostCalls,
  } = queueMainSettings || {};

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

  const handleChangeQueueMainSettingsValue = React.useCallback((editName, editValue) => {
    briefcasesStoreChangeMainSettings({
      [editName]: editValue,
    });
  }, [briefcasesStoreChangeMainSettings]);

  const handleSaveRecallSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveRecallSettings(queueRecallSettings);
  }, [queueRecallSettings, briefcasesStoreSaveRecallSettings]);

  const handleSaveTimeZoneSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveTimeZoneSettings(queueTimeZoneSettings);
  }, [queueTimeZoneSettings, briefcasesStoreSaveTimeZoneSettings]);

  const handleSaveQueueMainSettings = React.useCallback((e) => {
    e.stopPropagation();
    briefcasesStoreSaveMainSettings(queueMainSettings);
  }, [queueMainSettings, briefcasesStoreSaveMainSettings]);

  const editedQueueMainSettingsTemplate = React.useMemo(
    () => queueMainSettingsTemplate.map((v) => {
      if (v.id === 5) {
        return {
          ...v,
          options: queueControlTypes,
          loading: loadingQueueControlTypes,
        };
      }
      return v;
    }), [loadingQueueControlTypes, queueControlTypes],
  );

  const queueMainSettingsBody = React.useMemo(
    () => {
      if (queueMainSettings) {
        return (
          <div className="main">
            {formGenerator(
              editedQueueMainSettingsTemplate,
              queueMainSettings,
              handleChangeQueueMainSettingsValue,
            )}
          </div>
        );
      }
      return null;
    }, [
      editedQueueMainSettingsTemplate,
      queueMainSettings,
      handleChangeQueueMainSettingsValue,
    ],
  );

  React.useEffect(() => {
    if (queueId) {
      briefcasesStoreGetMainSettings(queueId);
      briefcasesStoreGetRecallSettings(queueId);
      briefcasesStoreGetTimeZoneSettings(queueId);
    }
  }, [
    queueId,
    briefcasesStoreGetMainSettings,
    briefcasesStoreGetRecallSettings,
    briefcasesStoreGetTimeZoneSettings,
  ]);

  React.useEffect(() => () => {
    briefcasesStoreGetMainSettingsCancel();
    briefcasesStoreGetRecallSettingsCancel();
    briefcasesStoreGetTimeZoneSettingsCancel();
  }, [
    briefcasesStoreGetMainSettingsCancel,
    briefcasesStoreGetRecallSettingsCancel,
    briefcasesStoreGetTimeZoneSettingsCancel,
  ]);

  return (
    <div className="main-tab">
      <div className="queue-settings">
        <QueueSettingItem
          title="Основные настройки"
          saveCallback={handleSaveQueueMainSettings}
          trySave={trySaveQueueMainSettings}
          body={queueMainSettingsBody}
          loading={loadingQueueMainSettings}
          disableSaveButton={!(QueueLimitCoefficient || QueueLimitCoefficient === 0)
          || !(QueueLimitCoefficientPerOperatorMax || QueueLimitCoefficientPerOperatorMax === 0)
          || !(QueueLimitCoefficientPerOperatorMin || QueueLimitCoefficientPerOperatorMin === 0)
          || !(ControlType || ControlType === 0)
          || !(Work || Work === 0)
          || !(AcceptPercentLostCalls || AcceptPercentLostCalls === 0)}
        />
        <QueueSettingItem
          title="Настройки перезвона"
          saveCallback={handleSaveRecallSettings}
          trySave={trySaveQueueRecallSettings}
          loading={loadingQueueRecallSettings}
          body={queueRecallSettings
          && Array.isArray(queueRecallSettings)
          && queueRecallSettings.map((v) => {
            const { EventCode } = v || {};
            return (
              <QueueSettingsRecallItem
                key={EventCode}
                data={v}
                callback={handleChangeRecallValue}
              />
            );
          })}
        />
        <QueueSettingItem
          title="Настройки часовых поясов"
          saveCallback={handleSaveTimeZoneSettings}
          trySave={trySaveQueueTimeZoneSettings}
          loading={loadingQueueTimeZoneSettings}
          body={queueTimeZoneSettings
          && Array.isArray(queueTimeZoneSettings)
          && queueTimeZoneSettings.map((v) => {
            const { TimeZoneId } = v || {};
            return (
              <QueueSettingsTimeZoneItem
                key={TimeZoneId}
                data={v}
                callback={handleChangeTimeZoneValue}
              />
            );
          })}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  queueRecallSettings: state.briefcasesStore.queueRecallSettings,
  loadingQueueRecallSettings: state.briefcasesStore.loadingQueueRecallSettings,
  trySaveQueueRecallSettings: state.briefcasesStore.trySaveQueueRecallSettings,
  queueTimeZoneSettings: state.briefcasesStore.queueTimeZoneSettings,
  loadingQueueTimeZoneSettings: state.briefcasesStore.loadingQueueTimeZoneSettings,
  trySaveQueueTimeZoneSettings: state.briefcasesStore.trySaveQueueTimeZoneSettings,
  queueMainSettings: state.briefcasesStore.queueMainSettings,
  loadingQueueMainSettings: state.briefcasesStore.loadingQueueMainSettings,
  trySaveQueueMainSettings: state.briefcasesStore.trySaveQueueMainSettings,
  queueControlTypes: state.briefcasesStore.queueControlTypes,
  loadingQueueControlTypes: state.briefcasesStore.loadingQueueControlTypes,
  queueId: state.popUpStore.queueId,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
