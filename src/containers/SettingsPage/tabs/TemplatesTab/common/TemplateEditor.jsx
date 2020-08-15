import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import Editor from './Editor';
import UIInput from '../../../../../components/UIInput/UIInput';

function TemplateEditor(props) {
  const {
    id,
    templateInfo,
    templateInfoLoading,
    templateVar,
    templateVarLoading,
    trySaveTemplate,
    settingsStoreGetTemplateInfo,
    settingsStoreGetTemplateInfoCancel,
    settingsStoreSaveTemplate,
    popUpStoreSetSubSection,
  } = props || {};

  const { text, name } = templateInfo || {};

  React.useEffect(() => {
    if (id) {
      settingsStoreGetTemplateInfo(id);
    }
  }, [id, settingsStoreGetTemplateInfo]);

  React.useEffect(() => () => {
    settingsStoreGetTemplateInfoCancel();
  }, [
    settingsStoreGetTemplateInfoCancel,
  ]);

  const handleSaveTemplate = React.useCallback(() => {
    settingsStoreSaveTemplate(templateInfo);
  }, [templateInfo, settingsStoreSaveTemplate]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    popUpStoreSetSubSection('templateInfo', {
      [editName]: editValue,
    });
  }, [popUpStoreSetSubSection]);

  return (
    <div className="settings-page__add-template-popup add-item-popup">
      <div className="add-item-popup__title">
        <span className="ellipsis-element">{id ? 'Редактирование шаблона' : 'Добавление шаблона'}</span>
      </div>
      <div className="add-item-popup__body">
        {templateInfoLoading && (
          <div className="add-item-popup__loader">
            <UILoader text="Загрузка данных..." />
          </div>
        )}
        {!templateInfoLoading && (
          <div className="add-item-popup__table">
            <UIInput
              title="Название шаблона"
              name="name"
              data={name}
              required
              minLength={1}
              callback={handleChangeValue}
              type="--style-1c"
            />
            <Editor
              data={text}
              name="text"
              callback={handleChangeValue}
              templateVar={templateVar}
              templateVarLoading={templateVarLoading}
            />
          </div>
        )}
      </div>
      <div className="add-item-popup__btn">
        <Button
          circular
          positive
          size="small"
          disabled={templateInfoLoading || !name || !text}
          onClick={handleSaveTemplate}
          loading={trySaveTemplate}
          title={`${id ? 'Сохранить' : 'Добавить'} шаблон`}
        >
          <Icon name="check" />
          {id ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  templateInfoLoading: state.popUpStore.templateInfoLoading,
  templateInfo: state.popUpStore.templateInfo,
  trySaveTemplate: state.popUpStore.trySaveTemplate,
  templateVar: state.settingsStore.templateVar,
  templateVarLoading: state.settingsStore.templateVarLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEditor);
