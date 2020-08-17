import React from 'react';
import './OperationalReportTab.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import operationalReportFilterTemplate from './settings';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';

function OperationalReportTab(props) {
  const {
    filterForOperationalReport,
    tryGetOperationalReport,
    reportsStoreSetSubSection,
    reportsStoreGetOperationalReport,
    reportsStoreGetOperationalReportCancel,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('filterForOperationalReport', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const handleGetReport = React.useCallback(() => {
    reportsStoreGetOperationalReport(filterForOperationalReport);
  }, [
    filterForOperationalReport,
    reportsStoreGetOperationalReport,
  ]);

  /* ***************************** mount ********************** */

  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    reportsStoreGetOperationalReportCancel();
  }, [
    reportsStoreGetOperationalReportCancel,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page__tab operational-report report">
      <div className="element-wrapper">
        <UIElementTitle title="Операционный отчет" />
        <div className="report__body">
          {formGenerator(
            operationalReportFilterTemplate,
            filterForOperationalReport,
            handleChangeValue,
          )}
        </div>
        <div className="report__controls">
          <Button
            circular
            primary
            size="tiny"
            loading={tryGetOperationalReport}
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
  filterForOperationalReport: state.reportsStore.filterForOperationalReport,
  tryGetOperationalReport: state.reportsStore.tryGetOperationalReport,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(OperationalReportTab);
