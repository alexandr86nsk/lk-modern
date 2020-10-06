import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UITable from '../../../components/UITable/UITable';
import { jobStatusReportTableHeader, jobHistoryReportTableHeader } from './settings';

const JobStatusReport = (props) => {
  const {
    briefcases,
    briefcasesLoading,
    item,
    isJobHistory,
    reportsGridStoreGetJobStatusReport,
    reportsGridStoreGetJobStatusReportCancel,
    reportsGridStoreGetJobHistoryReport,
    reportsGridStoreGetJobHistoryReportCancel,
    reportsGridStoreSetReportSection,
  } = props || {};

  const {
    id,
    data,
    selectedBriefcase,
    loading,
    tableSearchString,
  } = item || {};

  React.useEffect(() => {
    if (selectedBriefcase) {
      if (isJobHistory) {
        reportsGridStoreGetJobHistoryReport({
          id,
          selectedBriefcase,
        });
      } else {
        reportsGridStoreGetJobStatusReport({
          id,
          selectedBriefcase,
        });
      }
    }
  }, [
    id,
    isJobHistory,
    selectedBriefcase,
    reportsGridStoreGetJobStatusReport,
    reportsGridStoreGetJobHistoryReport,
  ]);

  React.useEffect(() => () => {
    reportsGridStoreGetJobStatusReportCancel();
    reportsGridStoreGetJobHistoryReportCancel();
  }, [reportsGridStoreGetJobStatusReportCancel, reportsGridStoreGetJobHistoryReportCancel]);

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    reportsGridStoreSetReportSection({
      id,
      [editName]: editValue,
    });
  }, [id, reportsGridStoreSetReportSection]);

  const handleSearch = React.useCallback((value) => {
    reportsGridStoreSetReportSection({
      id,
      tableSearchString: value,
    });
  }, [reportsGridStoreSetReportSection, id]);

  return (
    <div className="job-status-report">
      <div className="job-status-report__body">
        <div className="job-status-report__table">
          <UITable
            fixed
            sortable
            header={isJobHistory ? jobHistoryReportTableHeader : jobStatusReportTableHeader}
            data={data}
            pagination
            search
            searchString={tableSearchString}
            searchCallback={handleSearch}
            empty="Отчет пуст"
            loadingData={loading}
            selectable
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
