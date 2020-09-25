import React from 'react';
import UILoader from '../../../components/UILoader/UILoader';
import QueueAsteriskSettings from './QueueAsteriskEditor';

function QueueAsteriskSettingItem(props) {
  const {
    queueInfoLoading,
  } = props || {};

  return (
    <div className="briefcases-page__edit-queue-popup add-item-popup">
      <div className="add-item-popup__title">
        <span className="ellipsis-element">Редактирование очереди</span>
      </div>
      <div className="add-item-popup__body">
        {queueInfoLoading && (
          <div className="add-item-popup__loader">
            <UILoader text="Загрузка данных" type="--google" />
          </div>
        )}
        {!queueInfoLoading && (
          <QueueAsteriskSettings />
        )}
      </div>
      {/* <div className="add-item-popup__btn">
        <Button
          circular
          positive
          size="small"
          disabled={queueInfoLoading || disableSaveBtn}
          onClick={handleSaveQueue}
          loading={trySaveQueue}
          title='Сохранить очередь'
        >
          <Icon name="check" />
          Сохранить
        </Button>
      </div> */}
    </div>
  );
}

export default React.memo(QueueAsteriskSettingItem);
