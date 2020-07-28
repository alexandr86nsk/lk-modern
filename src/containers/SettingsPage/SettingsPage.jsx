import React from 'react';
import { connect } from 'react-redux';
import './SettingsPage.scss';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UILoader from '../../components/UILoader/UILoader';
import UITab from '../../components/UITab/UITab';
import settingsTabs from './settings';


function SettingsPage(props) {
  const {
    dataLoaded,
    settingsStoreGetAll,
  } = props;

  React.useEffect(() => {
    settingsStoreGetAll();
  }, [settingsStoreGetAll]);

  return (
    <div className="settings-page page__content">
      <UIBlockTitle title="Настройки" />
      {!dataLoaded ? <UILoader text="Загрузка" size="large" /> : (
        <UITab
          tabs={settingsTabs}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataLoaded: state.settingsStore.dataLoaded,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
