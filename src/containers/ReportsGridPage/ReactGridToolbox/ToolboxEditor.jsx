import React from 'react';
import './ToolboxEditor.scss';
import { Button, Icon } from 'semantic-ui-react';
import UIInput from '../../../components/UIInput/UIInput';

function ToolboxEditor(props) {
  const {
    title,
  } = props || {};
  return (
    <div className="reports-grid-page__edit-toolbox-popup popup">
      <div className="popup__title">
        <span className="ellipsis-element">{title}</span>
      </div>
      <div className="popup__body">
        <UIInput title="Введите название" type="--style-1c --transparent --translate-title" />
      </div>
      <div className="popup__btn">
        <Button
          circular
          negative
          size="tiny"
          onClick={() => {}}
        >
          <Icon name="close" />
          Отмена
        </Button>
        <Button
          circular
          positive
          size="tiny"
          onClick={() => {}}
        >
          <Icon name="check" />
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ToolboxEditor);
