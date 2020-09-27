import React from 'react';
import '../../ReportsPage.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import { actualStateTable } from '../settings';
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

  const handleRefreshTable = React.useCallback((auto) => {
    reportsStoreGetActualState({
      data: {
        startDate: actualStateFrom,
        endDate: actualStateTo,
        briefcaseId: selectedActualStateBriefcase,
        phone: selectedActualStatePhone,
      },
      auto,
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

  React.useEffect(() => {
    handleRefreshTable(false);
  }, [handleRefreshTable]);

  const handleSetValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSection({
      [editName]: editValue,
    });
  }, [reportsStoreSetSection]);

  const sortedActualState = React.useMemo(
    () => _.sortBy(actualState, 'CallModifyDate').reverse(),
    [actualState],
  );

  React.useEffect(() => {
    if (!actualStateTableTemplate || !actualStateTableStore) {
      reportsStoreSetSection({
        actualStateTableTemplate: actualStateTable,
        actualStateTableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          filter: false,
          customId: 'BriefcaseId',
          searchCustom: <ActualStateFilter />,
          refresh: false,
        },
      });
    }
  }, [
    actualStateTableTemplate,
    actualStateTableStore,
    reportsStoreSetSection,
  ]);

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
  actualStateFrom: state.reportsStore.actualStateFrom,
  actualStateTo: state.reportsStore.actualStateTo,
  briefcases: state.reportsStore.briefcases,
  actualStateFilter: state.reportsStore.actualStateFilter,
  selectedActualStateBriefcase: state.reportsStore.selectedActualStateBriefcase,
  selectedActualStatePhone: state.reportsStore.selectedActualStatePhone,
  isLastRequestComplete: state.reportsStore.isLastRequestComplete,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActualStateTab);
