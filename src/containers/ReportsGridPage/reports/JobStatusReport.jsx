import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UITable from "../../../components/UITable/UITable";
import { jobStatusReportTableHeader, jobHistoryReportTableHeader } from "./settings";

function JobStatusReport(props) {
  const {
    jobHistory,
    item,
    testPageStoreGetJobStatusReport,
    testPageStoreGetJobStatusReportCancel,
    testPageStoreGetJobHistoryReport,
    testPageStoreGetJobHistoryReportCancel,
    testPageStoreUpdateReport,
    briefcases,
  } = props;

  const {
    id,
    data,
    selectedBriefcase,
    loading,
    tableSearchString,
  } = item || {};


  React.useEffect(() => {
    if (selectedBriefcase) {
      if (jobHistory) {
        testPageStoreGetJobHistoryReport({
          id,
          selectedBriefcase,
        });
      } else {
        testPageStoreGetJobStatusReport({
          id,
          selectedBriefcase,
        });
      }
    }
  }, [id, jobHistory, selectedBriefcase, testPageStoreGetJobStatusReport, testPageStoreGetJobHistoryReport]);

  React.useEffect(() => () => {
    testPageStoreGetJobStatusReportCancel();
    testPageStoreGetJobHistoryReportCancel();
  }, [testPageStoreGetJobStatusReportCancel, testPageStoreGetJobHistoryReportCancel]);

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    testPageStoreUpdateReport({
      id,
      [editName]: editValue,
    });
  }, [id, testPageStoreUpdateReport]);

  const handleSearch = React.useCallback((value) => {
    testPageStoreUpdateReport({
      id,
      tableSearchString: value,
    });
  }, [testPageStoreUpdateReport, id]);

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
            header={jobHistory ? jobHistoryReportTableHeader : jobStatusReportTableHeader}
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
}

const mapStateToProps = (state) => ({
  briefcases: state.referencesStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(JobStatusReport);
