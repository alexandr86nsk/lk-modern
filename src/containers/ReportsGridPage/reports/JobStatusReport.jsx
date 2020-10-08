import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import { jobStatusReportTableHeader, jobHistoryReportTableHeader } from './settings';
import tableDefaultConfig from '../../../components/UIRsuiteTable/tableDeafultConfig';
import UIRsuiteTable from '../../../components/UIRsuiteTable/UIRsuiteTable';

const JobStatusReport = (props) => {
  const {
    item,
    isJobHistory,
    briefcases,
    briefcasesLoading,
    reportsGridStoreGetReport,
    reportsGridStoreGetReportCancel,
    reportsGridStoreSetReportSection,
    reportsGridStoreSetReportTableStoreSection,
    reportsGridStoreSetReportTableTemplateSection,
  } = props || {};

  const {
    id,
    data,
    selectedBriefcase,
    loading,
    type,
    isLastRequestComplete,
    tableTemplate,
    tableStore,
  } = item || {};

  const refreshReport = React.useCallback((value) => {
    reportsGridStoreGetReport({
      data: {
        id,
        type,
        selectedBriefcase,
      },
      auto: value,
    });
  }, [
    id,
    type,
    selectedBriefcase,
    reportsGridStoreGetReport,
  ]);

  const refreshTimerCallback = React.useCallback(() => {
    if (isLastRequestComplete) {
      refreshReport(true);
    }
  }, [isLastRequestComplete, refreshReport]);

  React.useEffect(() => {
    const refreshTimer = setInterval(refreshTimerCallback, 3000);
    return () => clearInterval(refreshTimer);
  }, [refreshTimerCallback]);

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    reportsGridStoreSetReportSection({
      id,
      [editName]: editValue,
    });
  }, [id, reportsGridStoreSetReportSection]);

  const handleChangeTableStore = React.useCallback((value) => {
    reportsGridStoreSetReportTableStoreSection({
      id,
      ...value,
    });
  }, [id, reportsGridStoreSetReportTableStoreSection]);

  const handleChangeTableTemplate = React.useCallback((value) => {
    reportsGridStoreSetReportTableTemplateSection({
      id,
      ...value,
    });
  }, [id, reportsGridStoreSetReportTableTemplateSection]);

  React.useEffect(() => {
    if (!tableTemplate || !tableStore) {
      reportsGridStoreSetReportSection({
        id,
        tableTemplate: isJobHistory ? jobHistoryReportTableHeader : jobStatusReportTableHeader,
        tableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          search: true,
          customId: 'BriefcaseTitle',
          refresh: false,
        },
      });
    }
  }, [
    id,
    isJobHistory,
    tableTemplate,
    tableStore,
    reportsGridStoreSetReportSection,
  ]);

  React.useEffect(() => {
    reportsGridStoreSetReportTableStoreSection({
      id,
      tableLoading: loading,
    });
  },[id, loading, reportsGridStoreSetReportTableStoreSection]);

  React.useEffect(() => {
    reportsGridStoreGetReportCancel(id);
    refreshReport(false);
  }, [id, refreshReport, reportsGridStoreGetReportCancel]);

  React.useEffect(() => () => {
    reportsGridStoreGetReportCancel(id);
  }, [id, reportsGridStoreGetReportCancel]);

  return (
    <div className="job-status-report">
      <div className="job-status-report__body">
        <div className="job-status-report__table">
          <UIRsuiteTable
            tableStore={tableStore}
            tableStoreSetSection={handleChangeTableStore}
            tableTemplate={tableTemplate}
            tableTemplateSetSection={handleChangeTableTemplate}
            tableData={data}
          />
        </div>
      </div>
      <div className="report__filter">
        <UIReactSelect
          name="selectedBriefcase"
          title="Название кампании"
          options={briefcases}
          data={selectedBriefcase}
          callback={handleChangeFilter}
          loading={briefcasesLoading}
          placeholder="Выберите кампанию"
          type="--style-1c --transparent"
          isVirtualized
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  briefcases: state.reportsGridStore.briefcases,
  briefcasesLoading: state.reportsGridStore.briefcasesLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(JobStatusReport);
