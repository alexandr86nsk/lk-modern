import React from 'react';
import './ActivationReportTab.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import activationReportFilterTemplate from './settings';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import { getZonesOptions } from '../../../ZonePage/ZonePage';

function ActivationReportTab(props) {
  const {
    filterForActivationReport,
    tryGetActivationReport,
    reportsStoreSetSubSection,
    reportsStoreGetActivationReport,
    reportsStoreGetActivationReportCancel,
    zones,
    zonesLoading,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('filterForActivationReport', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const handleGetReport = React.useCallback(() => {
    reportsStoreGetActivationReport(filterForActivationReport);
  }, [
    filterForActivationReport,
    reportsStoreGetActivationReport,
  ]);

  const zoneOptions = React.useMemo(
    () => getZonesOptions(zones),
    [zones],
  );

  const editedTemplate = React.useMemo(() => {
    if (activationReportFilterTemplate
      && Array.isArray(activationReportFilterTemplate)
    ) {
      return activationReportFilterTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'zoneId') {
          return {
            ...v,
            options: zoneOptions,
            otherProps: {
              ...otherProps,
              loading: zonesLoading,
            },
          };
        }
        return v;
      });
    }
    return undefined;
  }, [
    zoneOptions,
    zonesLoading,
  ]);

  /* ***************************** mount ********************** */

  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    reportsStoreGetActivationReportCancel();
  }, [
    reportsStoreGetActivationReportCancel,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page__tab activation-report report">
      <div className="element-wrapper">
        <UIElementTitle title="Отчет по активациям" />
        <div className="report__body">
          {formGenerator(
            editedTemplate,
            filterForActivationReport,
            handleChangeValue,
          )}
        </div>
        <div className="report__controls">
          <Button
            circular
            primary
            size="tiny"
            loading={tryGetActivationReport}
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
  filterForActivationReport: state.reportsStore.filterForActivationReport,
  tryGetActivationReport: state.reportsStore.tryGetActivationReport,
  zones: state.zoneStore.zones,
  zonesLoading: state.zoneStore.zonesLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ActivationReportTab);
