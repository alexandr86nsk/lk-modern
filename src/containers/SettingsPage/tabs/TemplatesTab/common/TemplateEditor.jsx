import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../../redux/actions/actions';
import UILoader from '../../../../../components/UILoader/UILoader';
import Editor from './Editor';

function TemplateEditor(props) {
  const {
    id,
    templateInfo,
    templateInfoLoading,
    templateVar,
    settingsStoreSetTemplateInfoSection,
    settingsStoreGetTemplateInfo,
    settingsStoreGetTemplateInfoCancel,
    settingsStoreSaveTemplate,
    settingsStoreSaveTemplateCancel,
    settingsStoreClearTemplateInfo,
  } = props;

  const { text } = templateInfo || {};

  React.useEffect(() => {
    if (id) {
      settingsStoreGetTemplateInfo(id);
    }
  }, [id, settingsStoreGetTemplateInfo]);

  React.useEffect(() => () => {
    settingsStoreGetTemplateInfoCancel();
    settingsStoreSaveTemplateCancel();
    settingsStoreClearTemplateInfo();
  }, [
    settingsStoreClearTemplateInfo,
    settingsStoreGetTemplateInfoCancel,
    settingsStoreSaveTemplateCancel,
  ]);

  const handleSaveTemplate = React.useCallback(() => {
    settingsStoreSaveTemplate(templateInfo);
  }, [templateInfo, settingsStoreSaveTemplate]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    settingsStoreSetTemplateInfoSection({
      [editName]: editValue,
    });
  }, [settingsStoreSetTemplateInfoSection]);

  return (
    <div className="settings-page__add-template-popup">
      <div className="add-template-popup__title">
        <span className="ellipsis-element">{id ? 'Редактирование шаблона' : 'Добавление шаблона'}</span>
      </div>
      <div className="add-template-popup__body">
        {templateInfoLoading && (
          <div className="add-template-popup__loader">
            <UILoader text="Загрузка данных..." />
          </div>
        )}
        {!templateInfoLoading && (
          <div className="add-template-popup__table">
            <Editor
              data={text}
              name="text"
              callback={handleChangeValue}
              templateVar={templateVar}
            />
          </div>
        )}
      </div>
      <div className="add-template-popup__btn">
        <Button
          circular
          positive
          size="small"
          disabled={templateInfoLoading}
          onClick={handleSaveTemplate}
        >
          <Icon name="check" />
          {id ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  templateInfoLoading: state.settingsStore.templateInfoLoading,
  templateInfo: state.settingsStore.templateInfo,
  templateVar: state.settingsStore.templateVar,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEditor);
