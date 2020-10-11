import React from 'react';
import './ToolboxEditor.scss';
import { Button, Icon } from 'semantic-ui-react';
import UIInput from '../../../components/UIInput/UIInput';

function ToolboxEditor(props) {
  const {
    cancelCallback,
    saveCallback,
    title,
  } = props || {};

  const [stateTitle, setStateTitle] = React.useState(title);

  const handleChangeTitle = React.useCallback((_, value) => setStateTitle(value), []);

  const handleCancelClick = React.useCallback(() => {
    if (cancelCallback) {
      cancelCallback();
    }
  }, [cancelCallback]);

  const handleSaveClick = React.useCallback(() => {
    if (saveCallback) {
      saveCallback(stateTitle);
    }
  }, [saveCallback, stateTitle]);

  return (
    <div className="reports-grid-page__edit-toolbox-popup popup">
      <div className="popup__title">
        <span className="ellipsis-element">Сохранение панели</span>
      </div>
      <div className="popup__body">
        <UIInput
          title="Введите название"
          type="--style-1c --transparent --translate-title"
          data={stateTitle}
          callback={handleChangeTitle}
        />
      </div>
      <div className="popup__btn">
        <Button
          circular
          negative
          size="tiny"
          onClick={handleCancelClick}
        >
          <Icon name="close" />
          Отмена
        </Button>
        <Button
          circular
          positive
          size="tiny"
          onClick={handleSaveClick}
        >
          <Icon name="check" />
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ToolboxEditor);
