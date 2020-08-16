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
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
  } = props || {};

  const {
    financeConsultId,
    supervisorId,
  } = filterForRatingReportBySettlements || {};

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

  }, [
    
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreGetUsersCancel();
    reportsStoreGetRatingReportBySettlementsCancel();
    zoneStoreClear();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetUsersCancel,
    reportsStoreGetRatingReportBySettlementsCancel,
    zoneStoreClear,
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
  zones: state.zoneStore.zones,
  zonesLoading: state.zoneStore.zonesLoading,
  zoneInfo: state.zoneStore.zoneInfo,
  zoneInfoLoading: state.zoneStore.zoneInfoLoading,
  subZones: state.zoneStore.subZones,
  subZonesLoading: state.zoneStore.subZonesLoading,
  subZoneInfo: state.zoneStore.subZoneInfo,
  subZoneInfoLoading: state.zoneStore.subZoneInfoLoading,
  usersForZone: state.zoneStore.usersForZone,
  usersForZoneLoading: state.zoneStore.usersForZoneLoading,
  usersForSubZone: state.zoneStore.usersForSubZone,
  usersForSubZoneLoading: state.zoneStore.usersForSubZoneLoading,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(RatingReportBySettlementsTab);
