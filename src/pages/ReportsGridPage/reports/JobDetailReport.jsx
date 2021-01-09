import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UILoader from '../../../components/Loader';
import JobDetailReportItem from './JobDetailReportItem';

const JobDetailReport = (props) => {
  const {
    item,
    briefcases,
    briefcasesLoading,
    reportsGridStoreGetReport,
    reportsGridStoreGetReportCancel,
    reportsGridStoreSetReportSection,
  } = props || {};

  const {
    id,
    data,
    selectedBriefcase,
    loading,
    type,
    isLastRequestComplete,
  } = item || {};

  const {
    PercentageJobDetails,
    QuantyJobDetails,
    SystemParamsJobDetails,
  } = data || {};

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

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    reportsGridStoreSetReportSection({
      id,
      [editName]: editValue,
    });
  }, [id, reportsGridStoreSetReportSection]);

  const renderPercentageJobDetails = React.useMemo(
    () => <JobDetailReportItem data={PercentageJobDetails} title="Процентные данные задания" />,
    [PercentageJobDetails],
  );

  const renderQuantyJobDetails = React.useMemo(
    () => <JobDetailReportItem data={QuantyJobDetails} title="Количественные данные задания" />,
    [QuantyJobDetails],
  );

  const renderSystemParamsJobDetails = React.useMemo(
    () => <JobDetailReportItem data={SystemParamsJobDetails} title="Системные параметры задания" />,
    [SystemParamsJobDetails],
  );

  React.useEffect(() => {
    refreshReport(false);
  }, [refreshReport]);

  React.useEffect(() => {
    const refreshTimer = setInterval(refreshTimerCallback, 5000);
    return () => clearInterval(refreshTimer);
  }, [refreshTimerCallback]);

  React.useEffect(() => () => {
    reportsGridStoreGetReportCancel(id);
    reportsGridStoreSetReportSection({
      id,
      isLastRequestComplete: true,
    });
  }, [id, reportsGridStoreSetReportSection, reportsGridStoreGetReportCancel]);

  return (
    <div className="job-detail-report">
      <div className="job-detail-report__body">
        {loading
          && (
          <div className="job-detail-report__loader">
            <UILoader type="--google" dimmed />
          </div>
          )}
        <div className="job-detail-report__table">
          <Table selectable celled fixed size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Данные</Table.HeaderCell>
                <Table.HeaderCell>Значение</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {renderPercentageJobDetails}
              {renderQuantyJobDetails}
              {renderSystemParamsJobDetails}
            </Table.Body>
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailReport);
