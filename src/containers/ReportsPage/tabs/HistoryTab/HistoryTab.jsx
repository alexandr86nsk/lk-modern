import React, { useRef } from 'react';
import '../../ReportsPage.scss';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import UIReactSelect from '../../../../components/UIReactSelect/UIReactSelect';
import UIReactDatePicker from '../../../../components/UIReactDatePicker/UIReactDatePicker';
import filterSelectedCounter from '../../../../components/UITable/common/filterSelectedCounter';
import HistoryTabTable from './HistoryTabTable';
import FilterIcon from '../../../../static/images/filter_list-24px.svg';
import UITableFilter from '../../../../components/UITable/UITableFilter';

function HistoryTab(props) {
  const {
    history,
    isLastRequestComplete,
    historyLoaded,
    briefcases,
    historyFrom,
    historyTo,
    historyLoadingExcell,
    reportsStoreGetHistoryExcell,
    reportsStoreGetHistoryExcellCancel,
    selectedHistoryBriefcase,
    reportsStoreGetHistory,
    reportsStoreGetHistoryCancel,
    reportsStoreSetSection,
  } = props;

  const filterEl = useRef(null);
  const [showFilter, setShowFilter] = React.useState(false);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (filterEl.current && !filterEl.current.contains(event.target)) {
        setShowFilter(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });

  const handleShowFilter = React.useCallback(() => {
    setShowFilter(!showFilter);
  }, [showFilter]);

  const handleRefreshTable = React.useCallback((auto) => {
    reportsStoreGetHistory({
      historyFrom,
      historyTo,
      selectedHistoryBriefcase,
      auto,
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

  const handleSetValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSection({
      [editName]: editValue,
    });
  }, [reportsStoreSetSection]);

  const handleClearTableFilter = React.useCallback(() => {
    reportsStoreSetSection({
      historyFrom: '',
      historyTo: '',
      selectedHistoryBriefcase: '',
    });
  }, [reportsStoreSetSection]);

  const handleCloseTableFilter = React.useCallback(() => {
    setShowFilter(false);
  }, []);

  const renderFilter = React.useMemo(
    () => (
      <div className="history-tab__table-filter">
        <UIReactSelect
          type="--style-1c"
          title="Название кампании"
          name="selectedHistoryBriefcase"
          data={selectedHistoryBriefcase}
          options={briefcases}
          callback={handleSetValue}
          isClearable
        />
        <UIReactDatePicker
          type="--style-1c"
          title="Дата с"
          name="historyFrom"
          data={historyFrom}
          callback={handleSetValue}
          showTimeSelect
          timeFormat="HH:mm:ss"
          timeIntervals={15}
          timeCaption="Время с:"
          dateFormat="dd/mm/yyyy HH:mm:ss"
        />
        <UIReactDatePicker
          type="--style-1c"
          title="Дата по"
          name="historyTo"
          data={historyTo}
          callback={handleSetValue}
          showTimeSelect
          timeFormat="HH:mm:ss"
          timeIntervals={15}
          timeCaption="Время по:"
          dateFormat="dd/mm/yyyy HH:mm:ss"
        />
      </div>
    ),
    [briefcases, selectedHistoryBriefcase, historyFrom, historyTo, handleSetValue],
  );

  const filterSelected = React.useMemo(
    () => filterSelectedCounter([historyFrom, historyTo, selectedHistoryBriefcase]),
    [historyFrom, historyTo, selectedHistoryBriefcase],
  );

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
        <div className="filter-block" ref={filterEl}>
          <div className="filter-block__title">Фильтр: </div>
          <div
            role="presentation"
            className={`filter-block__icon${showFilter ? ' active' : ''}`}
            onClick={handleShowFilter}
            title="Фильтр"
          >
            <FilterIcon />
            {filterSelected > 0 && (
              <div className="filter-block__badge">
                {filterSelected}
              </div>
            )}
          </div>
          {showFilter && (
            <UITableFilter
              filterBody={renderFilter}
              filterClear={handleClearTableFilter}
              filterClose={handleCloseTableFilter}
            />
          )}
        </div>
        <div className="excell-block">
          <Button
            content="Выгрузить"
            icon="download"
            labelPosition="left"
            primary
            onClick={handleGetExcell}
            loading={historyLoadingExcell}
          />
        </div>
      </div>
      <HistoryTabTable dataLoaded={historyLoaded} data={history} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLastRequestComplete: state.reportsStore.isLastRequestComplete,
  history: state.reportsStore.history,
  historyLoaded: state.reportsStore.historyLoaded,
  historyFrom: state.reportsStore.historyFrom,
  historyTo: state.reportsStore.historyTo,
  historyLoadingExcell: state.reportsStore.historyLoadingExcell,
  briefcases: state.reportsStore.briefcases,
  selectedHistoryBriefcase: state.reportsStore.selectedHistoryBriefcase,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTab);
