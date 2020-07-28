import React from 'react';
import './BriefcasePage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import { briefcaseListTableTemplate } from './settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import WarningIcon from '../../static/images/warning-24px.svg';
import BriefcaseAddItem from './common/BriefcaseAddItem';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import QueueAsteriskSettings from './common/QueueAsteriskSettings';


function BriefcaseListPage(props) {
  const {
    tableStore,
    tableTemplate,
    list,
    briefcaseStoreGetBriefcaseList,
    briefcaseStoreStartBriefcase,
    briefcaseStoreStopBriefcase,
    briefcaseStoreAddBriefcase,
    briefcaseStoreUpdateBriefcaseFile,
    briefcaseStoreDeleteBriefcase,
    modalStoreSetSection,
    pageControlStoreSet,
    briefcaseStoreGetBriefcaseListCancel,
    briefcaseStoreStartBriefcaseCancel,
    briefcaseStoreStopBriefcaseCancel,
    briefcaseStoreUpdateBriefcaseFileCancel,
    briefcaseStoreAddBriefcaseCancel,
    pageControlStoreClear,
    briefcaseListStoreClear,
    briefcaseListStoreSetSection,
    briefcaseListStoreSetTableStoreSection,
    briefcaseListStoreSetTableTemplateSection,
    popUpStoreSetSection,
    briefcaseListStoreGetQueueAsteriskOptionsCancel,
    briefcaseListStoreGetQueueAsteriskOptions,
    popUpStoreClear,
  } = props;

  const handleRefreshTable = React.useCallback(() => {
    briefcaseStoreGetBriefcaseList();
  }, [briefcaseStoreGetBriefcaseList]);

  const handleEdit = React.useCallback((el) => {
    popUpStoreSetSection({
      show: true,
      component: <QueueAsteriskSettings id={el.QueuePhone} />,
      hidePageControl: true,
      type: '--horizontal-right-25',
    });
  }, [popUpStoreSetSection]);

  const handleStart = React.useCallback((el) => {
    briefcaseStoreStartBriefcase(el.BriefcaseId);
  }, [briefcaseStoreStartBriefcase]);

  const handleStop = React.useCallback((el) => {
    briefcaseStoreStopBriefcase(el.BriefcaseId);
  }, [briefcaseStoreStopBriefcase]);

  const handleUpload = React.useCallback((el, files) => {
    briefcaseStoreUpdateBriefcaseFile(el.BriefcaseId, files);
  }, [briefcaseStoreUpdateBriefcaseFile]);

  const removeBriefcase = React.useCallback((value) => {
    briefcaseStoreDeleteBriefcase(value.BriefcaseId);
  }, [briefcaseStoreDeleteBriefcase]);

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
    briefcaseStoreAddBriefcase({
      title: value.name,
      queuePhone: value.selectedQueueAsterisk,
    });
  }, [briefcaseStoreAddBriefcase]);

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
    setTimeout(() => {
      pageControlStoreSet({
        show: true,
        data: {
          actions: {
            add: handleAdd,
          },
          loading: {
            add: false,
          },
        },
      });
    }, 200);
  }, [handleAdd, pageControlStoreSet]);

  React.useEffect(() => {
    briefcaseListStoreSetSection({
      tableTemplate: briefcaseListTableTemplate,
    });
  }, [briefcaseListStoreSetSection]);

  React.useEffect(() => {
    briefcaseListStoreSetSection({
      tableStore: {
        ...tableDefaultConfig,
        tableRowHeight: 36,
        filter: false,
        customId: 'BriefcaseId',
        actions: [
          {
            id: 0,
            action: handleStart,
            title: 'Старт',
            icon: 'play',
            color: 'green',
            showCondition: (rowData) => (rowData.Status === 3 || rowData.Status === 5),
          },
          {
            id: 1,
            action: handleStop,
            title: 'Стоп',
            icon: 'stop',
            color: 'red',
            showCondition: (rowData) => (rowData.Status === 4),
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
        refreshCallback: handleRefreshTable,
        onRowDoubleClick: handleEdit,
      },
    });
  }, [
    handleRefreshTable,
    briefcaseListStoreSetSection,
    handleStart,
    handleStop,
    handleUpload,
    handleEdit,
    handleRemoveBriefcase,
  ]);

  React.useEffect(() => {
    briefcaseStoreGetBriefcaseList();
    briefcaseListStoreGetQueueAsteriskOptions();
  }, [
    briefcaseStoreGetBriefcaseList,
    briefcaseListStoreGetQueueAsteriskOptions,
  ]);

  React.useEffect(() => () => {
    briefcaseStoreGetBriefcaseListCancel();
    briefcaseStoreStartBriefcaseCancel();
    briefcaseStoreStopBriefcaseCancel();
    briefcaseStoreUpdateBriefcaseFileCancel();
    briefcaseStoreAddBriefcaseCancel();
    pageControlStoreClear();
    briefcaseListStoreClear();
    briefcaseListStoreGetQueueAsteriskOptionsCancel();
    popUpStoreClear();
  }, [
    briefcaseStoreGetBriefcaseListCancel,
    briefcaseStoreStartBriefcaseCancel,
    briefcaseStoreStopBriefcaseCancel,
    briefcaseStoreUpdateBriefcaseFileCancel,
    briefcaseStoreAddBriefcaseCancel,
    pageControlStoreClear,
    briefcaseListStoreClear,
    briefcaseListStoreGetQueueAsteriskOptionsCancel,
    popUpStoreClear,
  ]);

  return (
    <div className="briefcase-list page__content --with-page-controls">
      <UIBlockTitle title="Список очередей" />
      <UIRsuiteTable
        tableStore={tableStore}
        tableStoreSetSection={briefcaseListStoreSetTableStoreSection}
        tableTemplate={tableTemplate}
        tableTemplateSetSection={briefcaseListStoreSetTableTemplateSection}
        tableData={list}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  briefcaseListTableSearchString: state.briefcaseListStore.briefcaseListTableSearchString,
  briefcaseStatuses: state.referencesStore.briefcaseStatuses,
  tableStore: state.briefcaseListStore.tableStore,
  tableTemplate: state.briefcaseListStore.tableTemplate,
  list: state.briefcaseListStore.list,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcaseListPage);
