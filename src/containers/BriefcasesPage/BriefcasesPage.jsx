import React from 'react';
import './BriefcasesPage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import { briefcaseListTableTemplate } from './settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import WarningIcon from '../../static/images/warning-24px.svg';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import QueueAsteriskSettings from './common/QueueAsteriskEditor';

function BriefcasesPage(props) {
  const {
    tableStore,
    tableTemplate,
    briefcases,
    trySaveQueue,
    queueInfoLoading,
    briefcasesStoreGetBriefcases,
    briefcasesStoreGetBriefcasesCancel,
    briefcasesStoreStartBriefcase,
    briefcasesStoreStartBriefcaseCancel,
    briefcasesStoreStopBriefcase,
    briefcasesStoreStopBriefcaseCancel,
    briefcasesStoreDeleteBriefcase,
    briefcasesStoreDeleteBriefcaseCancel,
    briefcasesStoreUpdateBriefcaseFile,
    briefcasesStoreUpdateBriefcaseFileCancel,
    briefcasesStoreAddBriefcase,
    briefcasesStoreAddBriefcaseCancel,
    briefcasesStoreSetSection,
    briefcasesStoreSetTableStoreSection,
    briefcasesStoreSetTableTemplateSection,
    briefcasesStoreGetQueueAsteriskOptions,
    briefcasesStoreGetQueueAsteriskOptionsCancel,
    popUpStoreSetSection,
    popUpStoreClear,
    modalStoreSetSection,
  } = props || {};

  const handleRefreshTable = React.useCallback(() => {
    briefcasesStoreGetBriefcases();
  }, [briefcasesStoreGetBriefcases]);

  React.useEffect(() => {
    popUpStoreSetSection({
      closingImpossible: trySaveQueue,
    });
  }, [popUpStoreSetSection, trySaveQueue]);

  const handleEdit = React.useCallback((value) => {
    const { QueuePhone: thisQueuePhone } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <QueueAsteriskSettings id={thisQueuePhone} queueInfoLoading={queueInfoLoading} />,
      type: '--right --35 --rounded',
    });
  }, [queueInfoLoading, popUpStoreSetSection]);

  const handleStart = React.useCallback((value) => {
    const { Id: thisId } = value || {};
    briefcasesStoreStartBriefcase(thisId);
  }, [briefcasesStoreStartBriefcase]);

  const handleStop = React.useCallback((value) => {
    const { Id: thisId } = value || {};
    briefcasesStoreStopBriefcase(thisId);
  }, [briefcasesStoreStopBriefcase]);

  const removeBriefcase = React.useCallback((value) => {
    const { Id: thisId } = value || {};
    briefcasesStoreDeleteBriefcase(thisId);
  }, [briefcasesStoreDeleteBriefcase]);

  const handleRemoveBriefcase = React.useCallback((value) => {
    const { QueuePhone: thisQueuePhone } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Действительно хотите удалить очередь "${thisQueuePhone}"?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeBriefcase,
    });
  }, [modalStoreSetSection, removeBriefcase]);

  React.useEffect(() => {
    if (!tableTemplate || !tableStore) {
      briefcasesStoreSetSection({
        tableTemplate: briefcaseListTableTemplate,
        tableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          filter: false,
          customId: 'QueuePhone',
        },
      });
    }
  }, [
    handleRefreshTable,
    handleStart,
    handleStop,
    handleRemoveBriefcase,
    handleEdit,
    tableTemplate,
    tableStore,
    briefcasesStoreSetSection,
  ]);

  React.useEffect(() => {
    briefcasesStoreSetTableStoreSection({
      onRowDoubleClick: handleEdit,
      refreshCallback: handleRefreshTable,
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
          action: handleRemoveBriefcase,
          title: 'Удалить',
          icon: 'trash',
          hideTitle: true,
        },
      ],
    });
  }, [
    handleRefreshTable,
    handleStart,
    handleStop,
    handleEdit,
    handleRemoveBriefcase,
    briefcasesStoreSetTableStoreSection,
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
    <div className="briefcases-page page__content">
      <UIBlockTitle title="Список очередей" />
      <div className="element-wrapper --fullscreen">
        <UIRsuiteTable
          tableStore={tableStore}
          tableStoreSetSection={briefcasesStoreSetTableStoreSection}
          tableTemplate={tableTemplate}
          tableTemplateSetSection={briefcasesStoreSetTableTemplateSection}
          tableData={briefcases}
        />
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
  queueInfoLoading: state.briefcasesStore.queueInfoLoading,
  trySaveQueue: state.briefcasesStore.trySaveQueue,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcasesPage);
