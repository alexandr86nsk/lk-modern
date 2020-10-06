import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import JobDetailReport from '../reports/JobDetailReport';
import JobStatusReport from '../reports/JobStatusReport';
import JobCallHandlingReport from '../reports/JobCallHandlingReport';
import './ReportsGridItem.scss';

const reportTitle = {
  jobDetailReport: 'Детали задания',
  jobStatusReport: 'Статус задания',
  jobHistoryReport: 'Динамическая история задания',
  jobCallHandlingReport: 'Эффективность работы сотрудников',
};

const ReportsGridItem = (props) => {
  const {
    item,
    reportsGridStoreRemoveReport,
  } = props || {};

  const {
    id,
    type,
  } = item || {};

  const handleRemoveReport = React.useCallback(() => {
    reportsGridStoreRemoveReport(id);
  }, [reportsGridStoreRemoveReport, id]);

  const renderReportBody = React.useMemo(() => {
    switch (type) {
      case 'jobDetailReport':
        return <JobDetailReport item={item} />;
      case 'jobStatusReport':
        return <JobStatusReport item={item} />;
      case 'jobHistoryReport':
        return <JobStatusReport item={item} isJobHistory />;
      case 'jobCallHandlingReport':
        return <JobCallHandlingReport item={item} />;
      default:
        return null;
    }
  }, [item, type]);

  return (
    <div className={`report${type ? ` ${type}` : ''}`}>
      <div className="report__header">
        <div role="presentation" className="report__header-title ellipsis-element">
          {reportTitle[type]}
        </div>
        <div className="report__header-spotlight">
          <div role="presentation" className="report__header-btn close" onClick={handleRemoveReport} title="Закрыть" />
        </div>
      </div>
      <div className="report__body">
        {renderReportBody}
      </div>
    </div>
  );
};

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsGridItem);
