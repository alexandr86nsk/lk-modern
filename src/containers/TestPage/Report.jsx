import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import JobDetailReport from './reports/JobDetailReport';
import JobStatusReport from "./reports/JobStatusReport";
import JobCallHandlingReport from "./reports/JobCallHandlingReport";


function Report(props) {
  const {
    item,
    testPageStoreRemoveReport,
    testPageStoreChangeReportType,
    testPageStoreSetMainReport,
    mainReport,
    active,
  } = props;

  const {
    id,
    type,
    title,
  } = item || {};

  const handleRemoveReport = React.useCallback(() => {
    testPageStoreRemoveReport(id);
  }, [testPageStoreRemoveReport, id]);

  const handleChangeReportType = React.useCallback(() => {
    testPageStoreChangeReportType(id);
  }, [testPageStoreChangeReportType, id]);

  const renderReportBody = React.useMemo(() => {
    switch (item.reportType) {
      case 0:
        return <JobDetailReport item={item} />;
      case 1:
        return <JobStatusReport item={item} />;
      case 2:
        return <JobStatusReport item={item} jobHistory />;
      case 3:
        return <JobCallHandlingReport item={item} mainReport />;
      default:
        return null;
    }
  }, [item]);

  const handleShowReport = React.useCallback(() => {
    testPageStoreSetMainReport(id);
  }, [testPageStoreSetMainReport, id]);

  return (
    <div className={`report${type ? ` ${type}` : ''}${mainReport ? ` main-report` : ''}${active ? ' active' : ''}`}>
      {!mainReport && <div className="report__header">
        <div role="presentation" className="report__header-title ellipsis-element" onClick={type === 'tab' ? handleShowReport : null}>
          {title}
        </div>
        <div className="report__header-spotlight">
          {type === 'tab' && <div role="presentation" className="report__header-btn expand" onClick={handleChangeReportType} title="Развернуть" />}
          {type !== 'tab' && <div role="presentation" className="report__header-btn compress" onClick={handleChangeReportType} title="Свернуть" />}
          <div role="presentation" className="report__header-btn close" onClick={handleRemoveReport} title="Закрыть" />
        </div>
      </div>}
      {(type !== 'tab' || mainReport)
        && (
        <div className="report__body">
          {renderReportBody}
        </div>
        )}
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(Report);
