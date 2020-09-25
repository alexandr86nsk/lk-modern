import React from 'react';
import { settingsTabs } from '../settings';
import UITab from '../../../components/UITab/UITab';

function BriefcaseEditor() {
  return (
    <div className="briefcases-page__edit-briefcase-popup popup">
      <div className="popup__title">
        <span className="ellipsis-element">Управление</span>
      </div>
      <div className="popup__body">
        <div className="popup__scroll-block">
          <UITab
            tabs={settingsTabs}
            renderActiveOnly
          />
        </div>
      </div>
    </div>
  );
}

export default BriefcaseEditor;
