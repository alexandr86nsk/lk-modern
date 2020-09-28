import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import TimeZoneItem from './TimeZoneItem';
import UILoader from '../../../../components/UILoader/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';

function TimeZoneTab(props) {
  const {
    timeZone,
    updatingTimeZoneSettings,
    loadingTimeZoneSettings,
    settingsStoreGetTimeZone,
    settingsStoreGetTimeZoneCancel,
    settingsStoreUpdateTimeZone,
    settingsStoreUpdateTimeZoneCancel,
    settingsStoreChangeTimeZoneItem,
  } = props || {};

  const handleChangeValue = React.useCallback((value) => {
    settingsStoreChangeTimeZoneItem(value);
  }, [settingsStoreChangeTimeZoneItem]);

  const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateTimeZone(timeZone);
  }, [timeZone, settingsStoreUpdateTimeZone]);

  const renderItems = React.useMemo(() => {
    if (timeZone && Array.isArray(timeZone)) {
      return timeZone.map((v) => {
        const { TimeZoneId } = v || {};
        return <TimeZoneItem key={TimeZoneId} data={v} callback={handleChangeValue} />;
      });
    } return null;
  },
  [timeZone, handleChangeValue]);

  React.useEffect(() => {
    settingsStoreGetTimeZone();
  }, [settingsStoreGetTimeZone]);

  React.useEffect(() => () => {
    settingsStoreGetTimeZoneCancel();
    settingsStoreUpdateTimeZoneCancel();
  }, [settingsStoreGetTimeZoneCancel, settingsStoreUpdateTimeZoneCancel]);

  return (
    <div className="settings-page__time-zone-tab tab">
      {loadingTimeZoneSettings && <UILoader type="--google" dimmed />}
      {!loadingTimeZoneSettings && timeZone && (
        <>
          <div className="input-block">
            {renderItems}
          </div>
          <div className="controls">
            <Button
              circular
              positive
              size="tiny"
              loading={updatingTimeZoneSettings}
              onClick={handleSaveChanges}
              title="Сохранить настройки часовых поясов"
            >
              <Icon name="check" />
              Сохранить
            </Button>
          </div>
        </>
      )}
      {!loadingTimeZoneSettings && !timeZone && <UIMissingData />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  timeZone: state.settingsStore.timeZone,
  updatingTimeZoneSettings: state.settingsStore.updatingTimeZoneSettings,
  loadingTimeZoneSettings: state.settingsStore.loadingTimeZoneSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneTab);
