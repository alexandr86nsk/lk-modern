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
    settingsStoreSetSection,
    settingsStoreGetTemplates,
    settingsStoreGetTemplatesCancel,
    settingsStoreSetTemplatesTableStoreSection,
    settingsStoreSetTemplatesTableTemplateSection,
    settingsStoreRemoveTemplate,
    settingsStoreRemoveTemplateCancel,
    settingsStoreGetTemplateVar,
    settingsStoreGetTemplateVarCancel,
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
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

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

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <TemplateEditor />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

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
    popUpStoreClear();
  }, [
    settingsStoreGetTemplatesCancel,
    settingsStoreRemoveTemplateCancel,
    settingsStoreGetTemplateVarCancel,
    popUpStoreClear,
  ]);

  return (
    <div className="settings-page__templates-tab">
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
            onClick={handleAdd}
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
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesTab);
