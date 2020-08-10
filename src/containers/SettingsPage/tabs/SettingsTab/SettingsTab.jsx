import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UILoader from '../../../../components/UILoader/UILoader';
import UIMissingData from '../../../../components/UIMissingData/UIMissingData';
import SettingsTabItem from './SettingsTabItem';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';

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

  const [error, setError] = React.useState(false);

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
      let err = 0;
      const arr = settings.map((v) => {
        const { id, value } = v || {};
        if (!(value || value === 0)) {
          err += 1;
        }
        return (
          <SettingsTabItem
            key={id}
            data={v}
            callback={handleChange}
          />
        );
      });
      if (err) {
        setError(true);
      } else {
        setError(false);
      }
      return arr;
    }
    return null;
  }, [settings, handleChange]);

  return (
    <div className="settings-page__settings-tab">
      {!settingsLoaded && <UILoader text="Загрузка настроек..." size="large" />}
      {settingsLoaded && renderContent
        && (
          <div className="element-wrapper">
            <UIElementTitle title="Настройки" />
            {renderContent}
            <div className="controls">
              <Button
                circular
                primary
                size="small"
                onClick={handleSaveClick}
                loading={trySaveSettings}
                disabled={error}
              >
                <Icon name="check" />
                Сохранить
              </Button>
            </div>
          </div>
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
