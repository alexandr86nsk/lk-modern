import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UILoader from '../../../../components/UILoader/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';
import SettingsTabItem from './SettingsTabItem';

function SettingsTab(props) {
  const {
    settings,
    settingsLoaded,
    trySaveSettings,
    settingsStoreGetSettings,
    settingsStoreGetSettingsCancel,
    settingsStoreUpdateSettings,
    settingsStoreSaveSettings,
    settingsStoreSaveSettingsCancel,
  } = props || {};

  React.useEffect(() => {
    settingsStoreGetSettings();
  }, [settingsStoreGetSettings]);

  React.useEffect(() => () => {
    settingsStoreSaveSettingsCancel();
    settingsStoreGetSettingsCancel();
  }, [
    settingsStoreSaveSettingsCancel,
    settingsStoreGetSettingsCancel,
  ]);

  const handleSaveClick = React.useCallback(() => {
    settingsStoreSaveSettings(settings);
  }, [settings, settingsStoreSaveSettings]);

  const handleChange = React.useCallback((value) => {
    settingsStoreUpdateSettings(value);
  }, [settingsStoreUpdateSettings]);

  const renderContent = React.useMemo(() => {
    if (settings && Array.isArray(settings)) {
      return settings.map((v) => {
        const { id } = v || {};
        return (
          <SettingsTabItem
            key={id}
            data={v}
            callback={handleChange}
          />
        );
      });
    }
    return null;
  }, [settings, handleChange]);

  return (
    <div className="settings-page__settings-tab">
      {!settingsLoaded && <UILoader text="Загрузка настроек..." size="large" />}
      {settingsLoaded && renderContent
        && (
          <>
            {renderContent}
            <div className="controls">
              <Button
                content="Сохранить"
                icon="check"
                labelPosition="left"
                positive
                onClick={handleSaveClick}
                loading={trySaveSettings}
              />
            </div>
          </>
        )}
      {settingsLoaded && !renderContent && <UIMissingData />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  settings: state.settingsStore.settings,
  settingsLoaded: state.settingsStore.settingsLoaded,
  trySaveSettings: state.settingsStore.trySaveSettings,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
