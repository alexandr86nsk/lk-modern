import React from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UITab from '../../components/UITab/UITab';
import settingsTabs from './settings';
import actions from '../../redux/actions/actions';

function SettingsPage(props) {
  const {
    modalStoreClear,
  } = props || {};

  React.useEffect(() => () => {
    modalStoreClear();
  }, [modalStoreClear]);

  return (
    <div className="settings-page page__content">
      <UIBlockTitle title="Администрирование" />
      <UITab
        tabs={settingsTabs}
        renderActiveOnly
      />
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(React.memo(SettingsPage));
