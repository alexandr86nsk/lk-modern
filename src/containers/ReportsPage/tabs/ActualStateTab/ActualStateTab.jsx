import React from 'react';
import '../../ReportsPage.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import { actualStateTable } from '../settings';
import UITable from '../../../../components/UITable/UITable';
import filterSelectedCounter from '../../../../components/UITable/common/filterSelectedCounter';
import UIReactDatePicker from '../../../../components/UIReactDatePicker/UIReactDatePicker';
import UIReactSelect from '../../../../components/UIReactSelect/UIReactSelect';
import UIInput from '../../../../components/UIInputV2/UIInput';

function ActualStateTab(props) {
  const {
    actualState,
    actualStateLoaded,
    briefcases,
    actualStateFrom,
    actualStateTo,
    selectedActualStateBriefcase,
    selectedActualStatePhone,
    reportsStoreGetActualState,
    reportsStoreGetActualStateCancel,
    reportsStoreSetSection,
    actualStateTableSearchString,
    isLastRequestComplete,
  } = props;

  const handleRefreshTable = React.useCallback((auto) => {
    reportsStoreGetActualState({
      actualStateFrom,
      actualStateTo,
      selectedActualStateBriefcase,
      selectedActualStatePhone,
      auto,
    });
  }, [
    selectedActualStateBriefcase,
    selectedActualStatePhone,
    actualStateFrom,
    actualStateTo,
    reportsStoreGetActualState,
  ]);

  const refreshTimerCallback = React.useCallback(() => {
    if (isLastRequestComplete) {
      handleRefreshTable(true);
    }
  }, [isLastRequestComplete, handleRefreshTable]);

  React.useEffect(() => {
    const refreshTimer = setInterval(refreshTimerCallback, 3000);
    return () => clearInterval(refreshTimer);
  }, [refreshTimerCallback]);

  React.useEffect(() => () => {
    reportsStoreGetActualStateCancel();
    reportsStoreSetSection({
      isLastRequestComplete: true,
    });
  }, [
    reportsStoreSetSection,
    reportsStoreGetActualStateCancel,
  ]);

  React.useEffect(() => {
    handleRefreshTable(false);
  }, [handleRefreshTable]);

  const handleSetValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSection({
      [editName]: editValue,
    });
  }, [reportsStoreSetSection]);

  const handleClearTableFilter = React.useCallback(() => {
    reportsStoreSetSection({
      actualStateFrom: '',
      actualStateTo: '',
      selectedActualStateBriefcase: '',
      selectedActualStatePhone: '',
    });
  }, [reportsStoreSetSection]);

  const renderFilter = React.useMemo(
    () => (
      <div className="actual-state-tab__table-filter">
        <UIReactSelect
          type="--style-1c"
          title="Название кампании"
          name="selectedActualStateBriefcase"
          data={selectedActualStateBriefcase}
          options={briefcases}
          callback={handleSetValue}
          isClearable
        />
        <UIReactDatePicker
          type="--style-1c"
          title="Дата с"
          name="actualStateFrom"
          data={actualStateFrom}
          callback={handleSetValue}
        />
        <UIReactDatePicker
          type="--style-1c"
          title="Дата по"
          name="actualStateTo"
          data={actualStateTo}
          callback={handleSetValue}
        />
        <UIInput
          type="--style-1c"
          title="Номер телефона"
          name="selectedActualStatePhone"
          data={selectedActualStatePhone}
          callback={handleSetValue}
          mask="00000000000"
        />
      </div>
    ),
    [
      briefcases,
      selectedActualStatePhone,
      selectedActualStateBriefcase,
      actualStateFrom,
      actualStateTo,
      handleSetValue,
    ],
  );

  const filterSelected = React.useMemo(
    () => filterSelectedCounter([
      actualStateFrom,
      actualStateTo,
      selectedActualStatePhone,
      selectedActualStateBriefcase,
    ]),
    [
      actualStateFrom,
      actualStateTo,
      selectedActualStatePhone,
      selectedActualStateBriefcase,
    ],
  );

  const sortedActualState = React.useMemo(
    () => _.sortBy(actualState, 'CallModifyDate').reverse(),
    [actualState],
  );

  const handleSearch = React.useCallback((value) => {
    reportsStoreSetSection({ actualStateTableSearchString: value });
  }, [reportsStoreSetSection]);

  return (
    <div className="reports-page__actual-state-tab">
      <UITable
        header={actualStateTable}
        data={sortedActualState}
        customId="BriefcaseId"
        pagination
        // refresh
        // refreshCallback={handleRefreshTable}
        filter
        filterSelected={filterSelected}
        filterBody={renderFilter}
        filterClear={handleClearTableFilter}
        search
        searchString={actualStateTableSearchString}
        searchCallback={handleSearch}
        empty="Отчет пуст"
        loadingData={!actualStateLoaded}
        selectable
        sortable
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLastRequestComplete: state.reportsStore.isLastRequestComplete,
  actualState: state.reportsStore.actualState,
  actualStateLoaded: state.reportsStore.actualStateLoaded,
  actualStateFrom: state.reportsStore.actualStateFrom,
  actualStateTableSearchString: state.reportsStore.actualStateTableSearchString,
  actualStateTo: state.reportsStore.actualStateTo,
  briefcases: state.reportsStore.briefcases,
  selectedActualStateBriefcase: state.reportsStore.selectedActualStateBriefcase,
  selectedActualStatePhone: state.reportsStore.selectedActualStatePhone,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActualStateTab);
