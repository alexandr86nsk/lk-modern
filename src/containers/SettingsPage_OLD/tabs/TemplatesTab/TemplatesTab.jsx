import React from 'react';
import '../../SettingsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import UIRsuiteTable from '../../../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../../../components/UIRsuiteTable/tableDeafultConfig';
import templatesTableConfig from './settings';
import WarningIcon from '../../../../static/images/warning-24px.svg';
import TemplateEditor from './common/TemplateEditor';

function TemplatesTab(props) {
  const {
    templates,
    templatesTableStore,
    templatesTableTemplate,
    trySaveTemplate,
    settingsStoreSetSection,
    settingsStoreGetTemplates,
    settingsStoreGetTemplatesCancel,
    settingsStoreSetTemplatesTableStoreSection,
    settingsStoreSetTemplatesTableTemplateSection,
    settingsStoreRemoveTemplate,
    settingsStoreRemoveTemplateCancel,
    settingsStoreGetTemplateVar,
    settingsStoreGetTemplateVarCancel,
    settingsStoreSaveTemplateCancel,
    popUpStoreSetSection,
    modalStoreSetSection,
    popUpStoreClear,
  } = props || {};

  const handleRefresh = React.useCallback(() => {
    settingsStoreGetTemplates();
  }, [settingsStoreGetTemplates]);

  const handleEdit = React.useCallback((value) => {
    const { id } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <TemplateEditor id={id} />,
      type: '--horizontal-right --35 --rounded',
    });
  }, [popUpStoreSetSection]);

  React.useEffect(() => {
    popUpStoreSetSection({
      closingImpossible: trySaveTemplate,
    });
  }, [popUpStoreSetSection, trySaveTemplate]);

  const removeTemplate = React.useCallback((value) => {
    const { id } = value || {};
    settingsStoreRemoveTemplate(id);
  }, [settingsStoreRemoveTemplate]);

  const handleRemove = React.useCallback((value) => {
    const { name } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете удаление ${name ? `шаблона "${name}"` : 'этого шаблона'}?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeTemplate,
    });
  }, [modalStoreSetSection, removeTemplate]);

  React.useEffect(() => {
    if (!templatesTableTemplate || !templatesTableStore) {
      settingsStoreSetSection({
        templatesTableTemplate: templatesTableConfig,
        templatesTableStore: {
          ...tableDefaultConfig,
          tableRowHeight: 36,
          filter: false,
          actions: [
            {
              id: 0,
              action: handleEdit,
              title: 'Изменить',
              icon: 'edit',
              hideTitle: true,
            },
            {
              id: 1,
              action: handleRemove,
              title: 'Удалить',
              icon: 'trash',
              hideTitle: true,
            },
          ],
          refreshCallback: handleRefresh,
          onRowDoubleClick: handleEdit,
        },
      });
    }
  }, [
    templatesTableStore,
    templatesTableTemplate,
    settingsStoreSetSection,
    handleRefresh,
    handleEdit,
    handleRemove,
  ]);

  React.useEffect(() => {
    settingsStoreGetTemplates();
    settingsStoreGetTemplateVar();
  }, [settingsStoreGetTemplates, settingsStoreGetTemplateVar]);

  React.useEffect(() => () => {
    settingsStoreGetTemplatesCancel();
    settingsStoreRemoveTemplateCancel();
    settingsStoreGetTemplateVarCancel();
    settingsStoreSaveTemplateCancel();
    popUpStoreClear();
  }, [
    settingsStoreGetTemplatesCancel,
    settingsStoreRemoveTemplateCancel,
    settingsStoreGetTemplateVarCancel,
    settingsStoreSaveTemplateCancel,
    popUpStoreClear,
  ]);

  return (
    <div className="settings-page__tab templates">
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title="Шаблоны" />
        <UIRsuiteTable
          tableStore={templatesTableStore}
          tableStoreSetSection={settingsStoreSetTemplatesTableStoreSection}
          tableTemplate={templatesTableTemplate}
          tableTemplateSetSection={settingsStoreSetTemplatesTableTemplateSection}
          tableData={templates}
        />
        <div className="add-block">
          <Button
            circular
            primary
            size="small"
            onClick={handleEdit}
            title="Добавить шаблон"
          >
            <Icon name="add" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  templates: state.settingsStore.templates,
  templatesTableStore: state.settingsStore.templatesTableStore,
  templatesTableTemplate: state.settingsStore.templatesTableTemplate,
  trySaveTemplate: state.popUpStore.trySaveTemplate,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesTab);
