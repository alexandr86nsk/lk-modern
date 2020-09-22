import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import actions from '../../../redux/actions/actions';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UILoader from '../../../components/UILoader/UILoader';
import JobDetailReportItem from './JobDetailReportItem';


function JobDetailReport(props) {
  const {
    item,
    testPageStoreGetJobDetailReport,
    testPageStoreGetJobDetailReportCancel,
    testPageStoreUpdateReport,
    briefcases,
  } = props;

  const {
    id,
    data,
    selectedBriefcase,
    loading,
  } = item || {};

  const {
    PercentageJobDetails,
    QuantyJobDetails,
    SystemParamsJobDetails,
  } = data || {};

  React.useEffect(() => {
    if (selectedBriefcase) {
      testPageStoreGetJobDetailReport({
        id,
        selectedBriefcase,
      });
    }
  }, [id, selectedBriefcase, testPageStoreGetJobDetailReport]);

  React.useEffect(() => () => {
    testPageStoreGetJobDetailReportCancel();
  }, [testPageStoreGetJobDetailReportCancel]);

  const handleChangeFilter = React.useCallback((editName, editValue) => {
    testPageStoreUpdateReport({
      id,
      [editName]: editValue,
    });
  }, [id, testPageStoreUpdateReport]);

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

  return (
    <div className="job-detail-report">
      <div className="report__filter">
        <UIReactSelect
          name="selectedBriefcase"
          options={briefcases || []}
          data={selectedBriefcase}
          callback={handleChangeFilter}
          placeholder="Выберите кампанию"
        />
      </div>
      <div className="job-detail-report__body">
        {loading
          && (
          <div className="job-detail-report__loader">
            <UILoader text="Идет загрузка данных..." />
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  briefcases: state.referencesStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailReport);
