import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import JobDetailReport from '../reports/JobDetailReport';
import JobStatusReport from '../reports/JobStatusReport';
import JobCallHandlingReport from '../reports/JobCallHandlingReport';

const ReportsGridItem = (props) => {
  const {
    item,
    reportsGridStoreRemoveReport,
  } = props || {};

  const {
    id,
    type,
    title,
    reportType,
  } = item || {};

  const handleRemoveReport = React.useCallback(() => {
    reportsGridStoreRemoveReport(id);
  }, [reportsGridStoreRemoveReport, id]);

  const renderReportBody = React.useMemo(() => {
    switch (reportType) {
      case 0:
        return <JobDetailReport item={item} />;
      case 1:
        return <JobStatusReport item={item} />;
      case 2:
        return <JobStatusReport item={item} isJobHistory />;
      case 3:
        return <JobCallHandlingReport item={item} />;
      default:
        return null;
    }
  }, [item, reportType]);

  return (
    <div className={`report${type ? ` ${type}` : ''}`}>
      <div className="report__header">
        <div role="presentation" className="report__header-title ellipsis-element">
          {title}
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
