import React from 'react';
import './TestPage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import DraggableList from './DraggableList';
import Report from './Report';


function TestPage(props) {
  const {
    reports,
    testPageStoreUpdateReport,
    mainReport,
    testPageStoreSetSection,
  } = props;

  const handleChangeType = React.useCallback((value) => {
    testPageStoreUpdateReport({
      id: value,
      type: '',
    });
  }, [testPageStoreUpdateReport]);

  const memoizedMainReport = React.useMemo(() => {
    if (mainReport && reports && Array.isArray(reports)
      && reports.filter((v) => v.id === mainReport).length) {
      return reports.filter((v) => v.id === mainReport)[0];
    }
    return null;
  }, [reports, mainReport]);

  const memoizedHandleChangeReportsPosition = React.useCallback((result) => {
    testPageStoreSetSection({
      reports: result,
    });
  }, [testPageStoreSetSection]);

  return (
    <div className="test-page page__content">
      <div className="test-page__top-menu">
        <DraggableList
          items={reports}
          changeTypeCallback={handleChangeType}
          mainReport={mainReport}
          callback={memoizedHandleChangeReportsPosition}
        />
      </div>
      <div className="test-page__body">
        {memoizedMainReport && <Report item={memoizedMainReport} mainReport />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataLoaded: state.testPageStore.dataLoaded,
  reports: state.testPageStore.reports,
  mainReport: state.testPageStore.mainReport,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
