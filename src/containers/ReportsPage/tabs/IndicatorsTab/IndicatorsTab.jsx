import React from 'react';
import '../../ReportsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import { callStatisticTable, operatorInfoTable } from '../settings';
import UITable from '../../../../components/UITable/UITable';
import UIBlockTitle from '../../../../components/UIBlockTitle/UIBlockTitle';
import UITextField from '../../../../components/UITextField/UITextField';
import UIReactSelect from '../../../../components/UIReactSelect/UIReactSelect';
import UIReactDatePicker from '../../../../components/UIReactDatePicker/UIReactDatePicker';
import UIInput from '../../../../components/UIInput/UIInput';
import filterSelectedCounter from '../../../../components/UITable/common/filterSelectedCounter';

function IndicatorsTab(props) {
  const {
    callStatisticReport,
    callStatisticReportLoaded,
    operatorInfoReport,
    operatorInfoReportLoaded,
    reportsStoreGetCallStatistic,
    reportsStoreGetCallStatisticCancel,
    reportsStoreGetOperatorInfo,
    reportsStoreGetOperatorInfoCancel,
    callStatisticReportSearchString,
    reportsStoreSetSection,
    callStatisticReportSelectedBriefcaseFilter,
    callStatisticReportSelectedQueuePhoneFilter,
    briefcases,
  } = props;

  const { OperatorInUpdate, OperatorInCall, OperatorInWaiting } = operatorInfoReport || {};

  const handleRefreshCallStatisticTable = React.useCallback(() => {
    if (callStatisticReportSelectedQueuePhoneFilter === 0 || callStatisticReportSelectedQueuePhoneFilter) {
      reportsStoreGetCallStatistic(callStatisticReportSelectedQueuePhoneFilter);
    } else {
      reportsStoreGetCallStatistic();
    }
  }, [callStatisticReportSelectedQueuePhoneFilter, reportsStoreGetCallStatistic]);

  const handleRefreshOperatorInfoTable = React.useCallback(() => {
    reportsStoreGetOperatorInfo();
  }, [reportsStoreGetOperatorInfo]);

  const handleSetFilter = React.useCallback((editName, editValue) => {
    reportsStoreSetSection({
      callStatisticReportSelectedBriefcaseFilter: editValue && (editValue.value || editValue.value === 0) ? editValue.value : null,
      callStatisticReportSelectedQueuePhoneFilter: editValue && (editValue.queuePhone || editValue.queuePhone === 0) ? editValue.queuePhone : null,
    });
  }, [reportsStoreSetSection]);

  React.useEffect(() => {
    if (callStatisticReportSelectedQueuePhoneFilter === 0 || callStatisticReportSelectedQueuePhoneFilter) {
      reportsStoreGetCallStatistic(callStatisticReportSelectedQueuePhoneFilter);
    } else {
      reportsStoreGetCallStatistic();
    }
  }, [callStatisticReportSelectedQueuePhoneFilter, reportsStoreGetCallStatistic]);

  React.useEffect(() => {
    reportsStoreGetOperatorInfo();
  }, [reportsStoreGetOperatorInfo]);

  React.useEffect(() => () => {
    reportsStoreGetCallStatisticCancel();
    reportsStoreGetOperatorInfoCancel();
  }, [reportsStoreGetCallStatisticCancel, reportsStoreGetOperatorInfoCancel]);

  const handleSearch = React.useCallback((value) => {
    reportsStoreSetSection({ callStatisticReportSearchString: value });
  }, [reportsStoreSetSection]);

  const handleClearTableFilter = React.useCallback(() => {
    reportsStoreSetSection({
      callStatisticReportSelectedBriefcaseFilter: '',
      callStatisticReportSelectedQueuePhoneFilter: '',
    });
  }, [reportsStoreSetSection]);

  const renderFilter = React.useMemo(
    () => (
      <div className="grid-wrapper">
        <UIReactSelect
          type="--style-1c"
          title="Название кампании"
          name="callStatisticReportSelectedBriefcaseFilter"
          data={callStatisticReportSelectedBriefcaseFilter}
          options={briefcases}
          fullValueCallback={handleSetFilter}
          isClearable
        />
      </div>
    ),[handleSetFilter, callStatisticReportSelectedBriefcaseFilter, briefcases],
  );

  const filterSelected = React.useMemo(
    () => filterSelectedCounter([
      callStatisticReportSelectedBriefcaseFilter,
    ]),
    [
      callStatisticReportSelectedBriefcaseFilter
    ],
  );

  return (
    <div className="reports-page__indicators-tab">
      <UITable
        header={callStatisticTable}
        data={callStatisticReport}
        pagination
        empty="Отчет пуст"
        loadingData={!callStatisticReportLoaded}
        selectable
        sortable
        refresh
        refreshCallback={handleRefreshCallStatisticTable}
        search
        searchString={callStatisticReportSearchString}
        searchCallback={handleSearch}
        filter
        filterSelected={filterSelected}
        filterBody={renderFilter}
        filterClear={handleClearTableFilter}
      />
      <UIBlockTitle title="Статусы операторов" />
      <UITextField type="inline underline" data={OperatorInCall === 0 || OperatorInCall ? OperatorInCall : ''} title="Разговор:" />
      <UITextField type="inline underline" data={OperatorInUpdate === 0 || OperatorInUpdate ? OperatorInUpdate : ''} title="Поствызов:" />
      <UITextField type="inline underline" data={OperatorInWaiting === 0 || OperatorInWaiting ? OperatorInWaiting : ''} title="Ожидание:" />
    </div>
  );
}

const mapStateToProps = (state) => ({
  operatorInfoReport: state.reportsStore.operatorInfoReport,
  operatorInfoReportLoaded: state.reportsStore.operatorInfoReportLoaded,
  callStatisticReport: state.reportsStore.callStatisticReport,
  callStatisticReportSelectedBriefcaseFilter: state.reportsStore.callStatisticReportSelectedBriefcaseFilter,
  callStatisticReportSelectedQueuePhoneFilter: state.reportsStore.callStatisticReportSelectedQueuePhoneFilter,
  callStatisticReportLoaded: state.reportsStore.callStatisticReportLoaded,
  callStatisticReportSearchString: state.reportsStore.callStatisticReportSearchString,
  briefcases: state.reportsStore.briefcases,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsTab);
