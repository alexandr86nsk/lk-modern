import React from 'react';
import '../../ReportsPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import HistoryTabTable from './HistoryTabTable';
import HistoryFilter from './HistoryFilter';

function HistoryTab(props) {
  const {
    history,
    isLastRequestComplete,
    historyLoading,
    historyFilter,
    historyLoadingExcell,
    reportsStoreGetHistoryExcell,
    reportsStoreGetHistoryExcellCancel,
    reportsStoreGetHistory,
    reportsStoreGetHistoryCancel,
    reportsStoreSetSection,
  } = props || {};

  const {
    historyFrom,
    historyTo,
    selectedHistoryBriefcase,
  } = historyFilter || {};

  const handleRefreshTable = React.useCallback((value) => {
    reportsStoreGetHistory({
      data: {
        startDate: historyFrom,
        endDate: historyTo,
        briefcaseId: selectedHistoryBriefcase,
      },
      auto: value,
    });
  }, [
    selectedHistoryBriefcase,
    historyFrom,
    historyTo,
    reportsStoreGetHistory,
  ]);

  const refreshTimerCallback = React.useCallback(() => {
    if (isLastRequestComplete) {
      handleRefreshTable(true);
    }
  }, [isLastRequestComplete, handleRefreshTable]);

  React.useEffect(() => {
    handleRefreshTable(false);
  }, [handleRefreshTable]);

  React.useEffect(() => {
    const refreshTimer = setInterval(refreshTimerCallback, 3000);
    return () => clearInterval(refreshTimer);
  }, [refreshTimerCallback]);

  React.useEffect(() => () => {
    reportsStoreGetHistoryCancel();
    reportsStoreGetHistoryExcellCancel();
    reportsStoreSetSection({
      isLastRequestComplete: true,
    });
  }, [
    reportsStoreSetSection,
    reportsStoreGetHistoryCancel,
    reportsStoreGetHistoryExcellCancel,
  ]);

  const handleGetExcell = React.useCallback(() => {
    reportsStoreGetHistoryExcell({
      historyFrom,
      historyTo,
      selectedHistoryBriefcase,
    });
  }, [historyFrom, historyTo, selectedHistoryBriefcase, reportsStoreGetHistoryExcell]);

  return (
    <div className="reports-page__history-tab">
      <div className="controls-block">
        <div className="excell-block">
          <Button
            circular
            primary
            size="tiny"
            loading={historyLoadingExcell}
            onClick={handleGetExcell}
            title="Выгрузить отчет"
          >
            <Icon name="download" />
            Выгрузить
          </Button>
        </div>
        <div className="filter-block">
          <HistoryFilter />
        </div>
      </div>
      <HistoryTabTable loading={historyLoading} data={history} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLastRequestComplete: state.reportsStore.isLastRequestComplete,
  history: state.reportsStore.history,
  historyLoading: state.reportsStore.historyLoading,
  historyLoadingExcell: state.reportsStore.historyLoadingExcell,
  historyFilter: state.reportsStore.historyFilter,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTab);
