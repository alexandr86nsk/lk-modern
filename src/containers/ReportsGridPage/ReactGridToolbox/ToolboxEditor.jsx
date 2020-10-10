import React from 'react';
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
        <UIInput title="Введите название" />
      </div>
    </div>
  );
}

export default React.memo(ToolboxEditor);
