import React from 'react';
import '../../ReportsPage.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import { actualStateTableDataTemplate } from './settings';
import UIRsuiteTable from '../../../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../../../components/UIRsuiteTable/tableDeafultConfig';
import ActualStateFilter from './ActualStateFilter';

function ActualStateTab(props) {
  const {
    actualState,
    actualStateTableStore,
    actualStateTableTemplate,
    actualStateFilter,
    isLastRequestComplete,
    reportsStoreGetActualState,
    reportsStoreGetActualStateCancel,
    reportsStoreSetSection,
    reportsStoreSetActualStateTableStoreSection,
    reportsStoreSetActualStateTableTemplateSection,
  } = props || {};

  const {
    selectedActualStateBriefcase,
    actualStateFrom,
    actualStateTo,
    selectedActualStatePhone,
  } = actualStateFilter || {};

  const handleRefreshTable = React.useCallback((value) => {
    reportsStoreGetActualState({
      data: {
        startDate: actualStateFrom,
        endDate: actualStateTo,
        briefcaseId: selectedActualStateBriefcase,
        phone: selectedActualStatePhone,
      },
      auto: value,
    });
  }, [
    selectedActualStateBriefcase,
    selectedActualStatePhone,
    actualStateFrom,
    actualStateTo,
    reportsStoreGetActualState,
  ]);

  const refreshTimerCallback = React.useCallback(() => {
    if (isLastRequestComplete) {
      handleRefreshTable(true);
    }
  }, [isLastRequestComplete, handleRefreshTable]);

  React.useEffect(() => {
    const refreshTimer = setInterval(refreshTimerCallback, 3000);
    return () => clearInterval(refreshTimer);
  }, [refreshTimerCallback]);

  React.useEffect(() => () => {
    reportsStoreGetActualStateCancel();
    reportsStoreSetSection({
      isLastRequestComplete: true,
    });
  }, [
    reportsStoreSetSection,
    reportsStoreGetActualStateCancel,
  ]);

  const sortedActualState = React.useMemo(
    () => _.sortBy(actualState, 'CallModifyDate').reverse(),
    [actualState],
  );

  React.useEffect(() => {
    if (!actualStateTableTemplate || !actualStateTableStore) {
      reportsStoreSetSection({
        actualStateTableTemplate: actualStateTableDataTemplate,
        actualStateTableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          search: true,
          customId: 'CallModifyDate',
          filter: true,
          filterCustom: <ActualStateFilter />,
          refresh: false,
        },
      });
    }
  }, [
    actualStateTableTemplate,
    actualStateTableStore,
    reportsStoreSetSection,
  ]);

  React.useEffect(() => {
    handleRefreshTable(false);
  }, [handleRefreshTable]);

  return (
    <div className="reports-page__actual-state-tab">
      <UIRsuiteTable
        tableStore={actualStateTableStore}
        tableStoreSetSection={reportsStoreSetActualStateTableStoreSection}
        tableTemplate={actualStateTableTemplate}
        tableTemplateSetSection={reportsStoreSetActualStateTableTemplateSection}
        tableData={sortedActualState}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  actualState: state.reportsStore.actualState,
  actualStateTableStore: state.reportsStore.actualStateTableStore,
  actualStateTableTemplate: state.reportsStore.actualStateTableTemplate,
  actualStateFilter: state.reportsStore.actualStateFilter,
  isLastRequestComplete: state.reportsStore.isLastRequestComplete,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActualStateTab);
