import React from 'react';
import './RewardReportTab.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import rewardReportFilterTemplate from './settings';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import { getUsersOptions } from '../../../ZonePage/ZonePage';

function RewardReportTab(props) {
  const {
    filterForRewardReport,
    tryGetRewardReport,
    reportsStoreSetSubSection,
    reportsStoreGetRewardReport,
    reportsStoreGetRewardReportCancel,
    usersForSubZone,
    usersForSubZoneLoading,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('filterForRewardReport', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const handleGetReport = React.useCallback(() => {
    reportsStoreGetRewardReport(filterForRewardReport);
  }, [
    filterForRewardReport,
    reportsStoreGetRewardReport,
  ]);

  const filteredFinanceConsults = React.useMemo(
    () => getUsersOptions(usersForSubZone),
    [usersForSubZone],
  );

  const editedTemplate = React.useMemo(() => {
    if (rewardReportFilterTemplate
      && Array.isArray(rewardReportFilterTemplate)
    ) {
      return rewardReportFilterTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'userId') {
          return {
            ...v,
            options: filteredFinanceConsults,
            otherProps: {
              ...otherProps,
              loading: usersForSubZoneLoading,
            },
          };
        }
        return v;
      });
    }
    return undefined;
  }, [
    filteredFinanceConsults,
    usersForSubZoneLoading,
  ]);

  /* ***************************** mount ********************** */

  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    reportsStoreGetRewardReportCancel();
  }, [
    reportsStoreGetRewardReportCancel,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page__tab reward-report report">
      <div className="element-wrapper">
        <UIElementTitle title="Отчет по вознаграждению" />
        <div className="report__body">
          {formGenerator(
            editedTemplate,
            filterForRewardReport,
            handleChangeValue,
          )}
        </div>
        <div className="report__controls">
          <Button
            circular
            primary
            size="tiny"
            loading={tryGetRewardReport}
            onClick={handleGetReport}
            title="Сформировать отчет"
          >
            <Icon name="download" />
            Сформировать
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filterForRewardReport: state.reportsStore.filterForRewardReport,
  tryGetRewardReport: state.reportsStore.tryGetRewardReport,
  usersForSubZone: state.zoneStore.usersForSubZone,
  usersForSubZoneLoading: state.zoneStore.usersForSubZoneLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RewardReportTab);
