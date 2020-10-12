import React from 'react';
import AnimateHeight from 'react-animate-height';
import { Button } from 'semantic-ui-react';
import UILoader from '../../../components/UILoader/UILoader';
import UIMissingData from '../../../components/UIMissingData/UIMissingData';

const heightVariables = {
  true: 'auto',
  false: 0,
};

function QueueSettingsItem(props) {
  const {
    title,
    blockName,
    body,
    loading,
    saveCallback,
    trySave,
    disableSaveButton,
  } = props || {};

  const [height, setHeight] = React.useState(true);

  const handleActiveClick = React.useCallback(() => {
    setHeight(!height);
  }, [height]);

  return (
    <div className={`queue-settings__item${height ? ' active' : ''}`}>
      <div role="presentation" className="settings-item__header" onClick={handleActiveClick}>
        <i
          className={`settings-item__dropdown-icon icon ${height ? 'minus square outline' : 'plus square outline'}`}
          aria-hidden
        />
        <div className="settings-item__title">
          <span className="settings-item__text ellipsis-element">{title}</span>
          <div className="settings-item__btn">
            <Button
              content="Сохранить"
              icon="check"
              labelPosition="left"
              primary
              onClick={saveCallback}
              loading={trySave}
              disabled={disableSaveButton}
            />
          </div>
        </div>
      </div>
      <AnimateHeight
        duration={300}
        height={heightVariables[height]}
      >
        <div className={`settings-item__body${blockName ? ` ${blockName}` : ''}`}>
          {loading && (
            <div className="settings-item__loader">
              <UILoader text="Загрузка" type="--google" />
            </div>
          )}
          {body || <UIMissingData />}
        </div>
      </AnimateHeight>
    </div>
  );
}

export default React.memo(QueueSettingsItem);
