import React from 'react';
import './BriefcasesPage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import { briefcasesTableTemplate } from './settings';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import WarningIcon from '../../static/images/warning-24px.svg';
import UIRsuiteTable from '../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../components/UIRsuiteTable/tableDeafultConfig';
import BriefcaseEditor from './common/BriefcaseEditor';
import UILoader from '../../components/UILoader/UILoader';

function BriefcasesPage(props) {
  const {
    tableStore,
    tableTemplate,
    briefcases,
    trySaveBriefcase,
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
    popUpStoreSetSection,
    popUpStoreClear,
    modalStoreSetSection,
  } = props || {};

  const handleRefreshTable = React.useCallback(() => {
    briefcasesStoreGetBriefcases();
  }, [briefcasesStoreGetBriefcases]);

  React.useEffect(() => {
    popUpStoreSetSection({
      closingImpossible: trySaveBriefcase,
    });
  }, [popUpStoreSetSection, trySaveBriefcase]);

  const handleEditBriefcase = React.useCallback((value) => {
    const { QueuePhone: thisQueuePhone } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <BriefcaseEditor id={thisQueuePhone} />,
      type: '--right --55 --rounded --styled',
      title: thisQueuePhone,
      queueId: thisQueuePhone,
    });
  }, [popUpStoreSetSection]);

  const handleStartBriefcase = React.useCallback((value) => {
    const { Id: thisId } = value || {};
    briefcasesStoreStartBriefcase(thisId);
  }, [briefcasesStoreStartBriefcase]);

  const handleStopBriefcase = React.useCallback((value) => {
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
        tableTemplate: briefcasesTableTemplate,
        tableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          filter: false,
          search: true,
          customId: 'QueuePhone',
          tableLoader: <UILoader type="--google" dimmed />,
        },
      });
    }
  }, [
    tableTemplate,
    tableStore,
    briefcasesStoreSetSection,
  ]);

  React.useEffect(() => {
    briefcasesStoreSetTableStoreSection({
      onRowDoubleClick: handleEditBriefcase,
      refreshCallback: handleRefreshTable,
      actions: [
        {
          id: 0,
          action: handleStartBriefcase,
          title: 'Старт',
          icon: 'play',
          color: 'green',
          showCondition: (rowData) => (rowData.Work === 1 || rowData.Work === 5),
        },
        {
          id: 1,
          action: handleStopBriefcase,
          title: 'Стоп',
          icon: 'stop',
          color: 'red',
          showCondition: (rowData) => (rowData.Work === 0),
        },
        {
          id: 2,
          action: handleEditBriefcase,
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
    handleStartBriefcase,
    handleStopBriefcase,
    handleEditBriefcase,
    handleRemoveBriefcase,
    briefcasesStoreSetTableStoreSection,
  ]);

  React.useEffect(() => {
    briefcasesStoreGetBriefcases();
  }, [
    briefcasesStoreGetBriefcases,
  ]);

  React.useEffect(() => () => {
    briefcasesStoreGetBriefcasesCancel();
    briefcasesStoreAddBriefcaseCancel();
    briefcasesStoreDeleteBriefcaseCancel();
    briefcasesStoreUpdateBriefcaseFileCancel();
    briefcasesStoreStartBriefcaseCancel();
    briefcasesStoreStopBriefcaseCancel();
    popUpStoreClear();
  }, [
    briefcasesStoreGetBriefcasesCancel,
    briefcasesStoreAddBriefcaseCancel,
    briefcasesStoreDeleteBriefcaseCancel,
    briefcasesStoreUpdateBriefcaseFileCancel,
    briefcasesStoreStartBriefcaseCancel,
    briefcasesStoreStopBriefcaseCancel,
    popUpStoreClear,
  ]);

  return (
    <div className="briefcases-page page__content">
      <UIBlockTitle title="Список очередей" />
      <UIRsuiteTable
        tableStore={tableStore}
        tableStoreSetSection={briefcasesStoreSetTableStoreSection}
        tableTemplate={tableTemplate}
        tableTemplateSetSection={briefcasesStoreSetTableTemplateSection}
        tableData={briefcases}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  tableStore: state.briefcasesStore.tableStore,
  tableTemplate: state.briefcasesStore.tableTemplate,
  briefcases: state.briefcasesStore.briefcases,
  trySaveBriefcase: state.briefcasesStore.trySaveBriefcase,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(BriefcasesPage);
