import React from 'react';
import '../../ReportsPage.scss';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions/actions';
import { callStatisticTableDataTemplate } from './settings';
import UIRsuiteTable from '../../../../components/UIRsuiteTable/UIRsuiteTable';
import tableDefaultConfig from '../../../../components/UIRsuiteTable/tableDeafultConfig';
import CallStatisticFilter from './CallStatisticFilter';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import OperatorInfo from './OperatorInfo';
import UILoader from '../../../../components/UILoader/UILoader';

function IndicatorsTab(props) {
  const {
    callStatisticTableStore,
    reportsStoreSetCallStatisticTableStoreSection,
    callStatisticTableTemplate,
    reportsStoreSetCallStatisticTableTemplateSection,
    callStatistic,
    callStatisticFilter,
    operatorInfo,
    operatorInfoLoading,
    reportsStoreGetCallStatistic,
    reportsStoreGetCallStatisticCancel,
    reportsStoreGetOperatorInfo,
    reportsStoreGetOperatorInfoCancel,
    reportsStoreSetSection,
  } = props || {};

  const {
    selectedCallStatisticBriefcase,
  } = callStatisticFilter || {};

  const handleRefreshTable = React.useCallback(() => {
    reportsStoreGetOperatorInfo(selectedCallStatisticBriefcase);
    reportsStoreGetCallStatistic(selectedCallStatisticBriefcase);
  }, [
    selectedCallStatisticBriefcase,
    reportsStoreGetOperatorInfo,
    reportsStoreGetCallStatistic,
  ]);

  React.useEffect(() => () => {
    reportsStoreGetCallStatisticCancel();
    reportsStoreGetOperatorInfoCancel();
  }, [reportsStoreGetCallStatisticCancel, reportsStoreGetOperatorInfoCancel]);

  React.useEffect(() => {
    if (!callStatisticTableTemplate || !callStatisticTableStore) {
      reportsStoreSetSection({
        callStatisticTableTemplate: callStatisticTableDataTemplate,
        callStatisticTableStore: {
          ...tableDefaultConfig,
          type: '--transparent',
          tableRowHeight: 36,
          search: true,
          customId: 'QueuePhone',
          filter: true,
          filterCustom: <CallStatisticFilter />,
          tableLoader: <UILoader type="--google" dimmed />,
        },
      });
    }
  }, [
    callStatisticTableTemplate,
    callStatisticTableStore,
    reportsStoreSetSection,
  ]);

  React.useEffect(() => {
    reportsStoreSetCallStatisticTableStoreSection({
      refreshCallback: handleRefreshTable,
    });
  }, [
    handleRefreshTable,
    reportsStoreSetCallStatisticTableStoreSection,
  ]);

  React.useEffect(() => {
    handleRefreshTable();
  }, [handleRefreshTable]);

  return (
    <div className="reports-page__indicators-tab">
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title="Статистика звонков" />
        <UIRsuiteTable
          tableStore={callStatisticTableStore}
          tableStoreSetSection={reportsStoreSetCallStatisticTableStoreSection}
          tableTemplate={callStatisticTableTemplate}
          tableTemplateSetSection={reportsStoreSetCallStatisticTableTemplateSection}
          tableData={callStatistic}
        />
      </div>
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title="Статусы операторов" />
        <OperatorInfo data={operatorInfo} loading={operatorInfoLoading} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  operatorInfo: state.reportsStore.operatorInfo,
  operatorInfoLoading: state.reportsStore.operatorInfoLoading,
  callStatistic: state.reportsStore.callStatistic,
  callStatisticFilter: state.reportsStore.callStatisticFilter,
  callStatisticTableStore: state.reportsStore.callStatisticTableStore,
  callStatisticTableTemplate: state.reportsStore.callStatisticTableTemplate,
  reportsStoreSetCallStatisticTableStoreSection: state.reportsStore.reportsStoreSetCallStatisticTableStoreSection,
  reportsStoreSetCallStatisticTableTemplateSection: state.reportsStore.reportsStoreSetCallStatisticTableTemplateSection,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsTab);
