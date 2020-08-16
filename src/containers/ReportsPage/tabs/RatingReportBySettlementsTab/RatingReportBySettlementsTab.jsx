import React from 'react';
import './RatingReportBySettlementsTab.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import ratingReportBySettlementsFilterTemplate from './settings';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';

function RatingReportBySettlementsTab(props) {
  const {
    filterForRatingReportBySettlements,
    reportsStoreSetSubSection,
    tryGetRatingReportBySettlements,
    reportsStoreGetRatingReportBySettlements,
    reportsStoreGetRatingReportBySettlementsCancel,
    reportStoreGetZones,
    reportStoreGetZonesCancel,
    reportStoreGetUsers,
    reportStoreGetUsersCancel,
  } = props || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('filterForRatingReportBySettlements', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const handleGetReport = React.useCallback(() => {
    reportsStoreGetRatingReportBySettlements();
  }, [reportsStoreGetRatingReportBySettlements]);

  const editedTemplate = React.useMemo(() => {
    if (ratingReportBySettlementsFilterTemplate
      && Array.isArray(ratingReportBySettlementsFilterTemplate)
    ) {
      return ratingReportBySettlementsFilterTemplate.map((v) => {
        const { blockKey } = v || {};
      });
    }
    return [];
  }, []);

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    reportStoreGetZones({ key: 'zone' });
    reportStoreGetUsers({ key: 'zone' });
    reportStoreGetUsers({ key: 'subZone' });
  }, [
    reportStoreGetZones,
    reportStoreGetUsers,
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    reportStoreGetZonesCancel();
    reportStoreGetUsersCancel();
    reportsStoreGetRatingReportBySettlementsCancel();
  }, [
    reportStoreGetZonesCancel,
    reportStoreGetUsersCancel,
    reportsStoreGetRatingReportBySettlementsCancel,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page__tab rating-report-by-settlements">
      <div className="element-wrapper">
        <UIElementTitle title="Рейтинговый отчёт по населённым пунктам" />
        <div className="rating-report-by-settlements__body">
          {formGenerator(
            editedTemplate,
            filterForRatingReportBySettlements,
            handleChangeValue,
          )}
        </div>
        <div className="rating-report-by-settlements__controls">
          <Button
            circular
            primary
            size="tiny"
            loading={tryGetRatingReportBySettlements}
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
  filterForRatingReportBySettlements: state.reportsStore.filterForRatingReportBySettlements,
  tryGetRatingReportBySettlements: state.reportsStore.tryGetRatingReportBySettlements,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RatingReportBySettlementsTab);
