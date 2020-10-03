import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UITable from '../../../components/UITable/UITable';
import { jobStatusReportTableHeader, jobHistoryReportTableHeader } from './settings';

const JobStatusReport = (props) => {
  const {
    item,
    isJobHistory,
    reportsGridStoreGetJobStatusReport,
    reportsGridStoreGetJobStatusReportCancel,
    reportsGridStoreGetJobHistoryReport,
    reportsGridStoreGetJobHistoryReportCancel,
    reportsGridStoreUpdateReport,
    briefcases,
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
    reportsGridStoreUpdateReport({
      id,
      [editName]: editValue,
    });
  }, [id, reportsGridStoreUpdateReport]);

  const handleSearch = React.useCallback((value) => {
    reportsGridStoreUpdateReport({
      id,
      tableSearchString: value,
    });
  }, [reportsGridStoreUpdateReport, id]);

  return (
    <div className="job-status-report">
      <div className="report__filter">
        <UIReactSelect
          name="selectedBriefcase"
          options={briefcases || []}
          data={selectedBriefcase}
          callback={handleChangeFilter}
          placeholder="Выберите кампанию"
        />
      </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  briefcases: state.reportsGridStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(JobStatusReport);
