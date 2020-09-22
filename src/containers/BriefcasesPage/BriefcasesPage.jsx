import React from 'react';
import './BriefcasesPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import { briefcaseListTableTemplate } from './settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import WarningIcon from '../../static/images/warning-24px.svg';
import BriefcaseAddItem from './common/BriefcaseAddItem';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import QueueAsteriskSettings from './common/QueueAsteriskSettings';
import { usersTableConfig } from '../SettingsPage_OLD/tabs/UsersTab/settings';
import UsersFilter from '../SettingsPage_OLD/tabs/UsersTab/common/UsersFilter';

function BriefcasesPage(props) {
  const {
    tableStore,
    tableTemplate,
    briefcases,
    briefcasesStoreGetBriefcases,
    briefcasesStoreStartBriefcase,
    briefcasesStoreStopBriefcase,
    briefcasesStoreAddBriefcase,
    briefcasesStoreUpdateBriefcaseFile,
    briefcasesStoreDeleteBriefcase,
    modalStoreSetSection,
    briefcasesStoreGetBriefcasesCancel,
    briefcasesStoreStartBriefcaseCancel,
    briefcasesStoreStopBriefcaseCancel,
    briefcasesStoreUpdateBriefcaseFileCancel,
    briefcasesStoreAddBriefcaseCancel,
    briefcasesStoreSetSection,
    briefcasesStoreSetTableStoreSection,
    briefcasesStoreSetTableTemplateSection,
    popUpStoreSetSection,
    briefcasesStoreGetQueueAsteriskOptionsCancel,
    briefcasesStoreGetQueueAsteriskOptions,
    popUpStoreClear,
  } = props || {};

  const handleRefreshTable = React.useCallback(() => {
    briefcasesStoreGetBriefcases();
  }, [briefcasesStoreGetBriefcases]);

  const handleEdit = React.useCallback((el) => {
    popUpStoreSetSection({
      show: true,
      component: <QueueAsteriskSettings id={el.QueuePhone} />,
      hidePageControl: true,
      type: '--horizontal-right-25',
    });
  }, [popUpStoreSetSection]);

  const handleStart = React.useCallback((el) => {
    briefcasesStoreStartBriefcase(el.BriefcaseId);
  }, [briefcasesStoreStartBriefcase]);

  const handleStop = React.useCallback((el) => {
    briefcasesStoreStopBriefcase(el.BriefcaseId);
  }, [briefcasesStoreStopBriefcase]);

  const handleUpload = React.useCallback((el, files) => {
    briefcasesStoreUpdateBriefcaseFile(el.BriefcaseId, files);
  }, [briefcasesStoreUpdateBriefcaseFile]);

  const removeBriefcase = React.useCallback((value) => {
    briefcasesStoreDeleteBriefcase(value.BriefcaseId);
  }, [briefcasesStoreDeleteBriefcase]);

  const handleRemoveBriefcase = React.useCallback((value) => {
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Действительно хотите удалить очередь "${value.QueuePhone}"?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeBriefcase,
    });
  }, [modalStoreSetSection, removeBriefcase]);

  const handleHideAddModal = React.useCallback((value) => {
    briefcasesStoreAddBriefcase({
      title: value.name,
      queuePhone: value.selectedQueueAsterisk,
    });
  }, [briefcasesStoreAddBriefcase]);

  const handleAdd = React.useCallback(() => {
    modalStoreSetSection({
      show: true,
      tempData: {
        name: null,
        selectedQueueAsterisk: null,
      },
      outputBody: {
        title: 'Добавление кампании',
        body: <BriefcaseAddItem />,
        buttons: {
          positive: 'Создать',
          negative: 'Отмена',
        },
      },
      requiredFields: [
        {
          name: 'name',
          type: 'length',
          validation: '1',
        },
        {
          name: 'selectedQueueAsterisk',
          type: 'required',
        },
      ],
      asyncClose: true,
      callback: handleHideAddModal,
    });
  }, [handleHideAddModal, modalStoreSetSection]);

  React.useEffect(() => {
    if (!tableTemplate || !tableStore) {
      briefcasesStoreSetSection({
        tableTemplate: briefcaseListTableTemplate,
        tableStore: {
          ...tableDefaultConfig,
          actions: [
            {
              id: 0,
              action: handleStart,
              title: 'Старт',
              icon: 'play',
              color: 'green',
              showCondition: (rowData) => (rowData.Work === 1 || rowData.Work === 5),
            },
            {
              id: 1,
              action: handleStop,
              title: 'Стоп',
              icon: 'stop',
              color: 'red',
              showCondition: (rowData) => (rowData.Work === 0),
            },
            {
              id: 2,
              action: handleEdit,
              title: 'Настройки',
              icon: 'settings',
              hideTitle: true,
            },
            {
              id: 3,
              upload: true,
              action: handleUpload,
              title: 'Загрузить файл',
              icon: 'attach',
              hideTitle: true,
            },
            {
              id: 4,
              action: handleRemoveBriefcase,
              title: 'Удалить',
              icon: 'trash',
              hideTitle: true,
            },
          ],
          tableRowHeight: 36,
          filter: false,
          customId: 'QueuePhone',
          onRowDoubleClick: handleEdit,
          refreshCallback: handleRefreshTable,
        },
      });
    }
  }, [
    handleRefreshTable,
    handleStart,
    handleStop,
    handleUpload,
    handleRemoveBriefcase,
    handleEdit,
    tableTemplate,
    tableStore,
    briefcasesStoreSetSection,
  ]);

  React.useEffect(() => {
    briefcasesStoreGetBriefcases();
    briefcasesStoreGetQueueAsteriskOptions();
  }, [
    briefcasesStoreGetBriefcases,
    briefcasesStoreGetQueueAsteriskOptions,
  ]);

  React.useEffect(() => () => {
    briefcasesStoreGetBriefcasesCancel();
    briefcasesStoreStartBriefcaseCancel();
    briefcasesStoreStopBriefcaseCancel();
    briefcasesStoreUpdateBriefcaseFileCancel();
    briefcasesStoreAddBriefcaseCancel();
    briefcasesStoreGetQueueAsteriskOptionsCancel();
    popUpStoreClear();
  }, [
    briefcasesStoreGetBriefcasesCancel,
    briefcasesStoreStartBriefcaseCancel,
    briefcasesStoreStopBriefcaseCancel,
    briefcasesStoreUpdateBriefcaseFileCancel,
    briefcasesStoreAddBriefcaseCancel,
    briefcasesStoreGetQueueAsteriskOptionsCancel,
    popUpStoreClear,
  ]);

  return (
    <div className="briefcase-page page__content">
      <div className="element-wrapper --fullscreen">
        <UIBlockTitle title="Список очередей" />
        <UIRsuiteTable
          tableStore={tableStore}
          tableStoreSetSection={briefcasesStoreSetTableStoreSection}
          tableTemplate={tableTemplate}
          tableTemplateSetSection={briefcasesStoreSetTableTemplateSection}
          tableData={briefcases}
        />
        <div className="add-block">
          <Button
            circular
            primary
            size="small"
            onClick={handleEdit}
            title="Добавить пользователя"
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
  briefcasesTableSearchString: state.briefcasesStore.briefcasesTableSearchString,
  briefcaseStatuses: state.briefcasesStore.briefcaseStatuses,
  tableStore: state.briefcasesStore.tableStore,
  tableTemplate: state.briefcasesStore.tableTemplate,
  briefcases: state.briefcasesStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcasesPage);
