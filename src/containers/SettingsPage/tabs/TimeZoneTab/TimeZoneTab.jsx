import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import TimeZoneItem from './TimeZoneItem';
import { Button } from "semantic-ui-react";

function TimeZoneTab(props) {
  const {
    timeZone,
    updatingTimeZoneSettings,
    settingsStoreUpdateTimeZone,
    settingsStoreChangeTimeZoneItem,
  } = props;

  const handleChangeValue = React.useCallback((value) => {
    settingsStoreChangeTimeZoneItem(value);
  }, [settingsStoreChangeTimeZoneItem]);

  const handleSaveChanges = React.useCallback(() => {
    settingsStoreUpdateTimeZone(timeZone);
  }, [timeZone, settingsStoreUpdateTimeZone]);

  const renderContent = React.useMemo(
    () => timeZone.map((v) => (
      <TimeZoneItem key={v.TimeZoneId} data={v} callback={handleChangeValue} />
    )),
    [timeZone, handleChangeValue],
  );

  return (
    <div className="settings-page__time-zone-tab">
      <div className="input-block">
        {renderContent}
      </div>
      <div className="controls">
        <Button
          content="Сохранить настройки часовых поясов"
          icon="check"
          labelPosition="left"
          positive
          onClick={handleSaveChanges}
          loading={updatingTimeZoneSettings}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  timeZone: state.settingsStore.timeZone,
  updatingTimeZoneSettings: state.settingsStore.updatingTimeZoneSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneTab);
