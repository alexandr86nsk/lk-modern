import React from 'react';
import './BriefcasesPage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import { briefcaseListTableTemplate } from './settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import WarningIcon from '../../static/images/warning-24px.svg';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import QueueAsteriskSettings from './common/QueueAsteriskSettings';

function BriefcasesPage(props) {
  const {
    tableStore,
    tableTemplate,
    briefcases,
    trySaveQueue,
    queueInfoLoading,
    briefcasesStoreGetBriefcases,
    briefcasesStoreStartBriefcase,
    briefcasesStoreStopBriefcase,
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

  React.useEffect(() => {
    popUpStoreSetSection({
      closingImpossible: trySaveQueue,
    });
  }, [popUpStoreSetSection, trySaveQueue]);

  const handleEdit = React.useCallback((el) => {
    const { QueuePhone: thisQueuePhone } = el || {};
    popUpStoreSetSection({
      show: true,
      component: <QueueAsteriskSettings id={thisQueuePhone} queueInfoLoading={queueInfoLoading} />,
      type: '--horizontal-right --35 --rounded',
    });
  }, [queueInfoLoading, popUpStoreSetSection]);

  const handleStart = React.useCallback((el) => {
    const { Id: thisId } = el || {};
    briefcasesStoreStartBriefcase(thisId);
  }, [briefcasesStoreStartBriefcase]);

  const handleStop = React.useCallback((el) => {
    const { Id: thisId } = el || {};
    briefcasesStoreStopBriefcase(thisId);
  }, [briefcasesStoreStopBriefcase]);

  const removeBriefcase = React.useCallback((value) => {
    const { Id: thisId } = value || {};
    briefcasesStoreDeleteBriefcase(thisId);
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
