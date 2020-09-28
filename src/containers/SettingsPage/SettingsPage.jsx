import React from 'react';
import './SettingsPage.scss';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UITab from '../../components/UITab/UITab';
import settingsTabs from './settings';

function SettingsPage() {
  return (
    <div className="settings-page page__content">
      <UIBlockTitle title="Настройки" />
      <UITab
        tabs={settingsTabs}
        renderActiveOnly
      />
    </div>
  );
}

export default SettingsPage;
