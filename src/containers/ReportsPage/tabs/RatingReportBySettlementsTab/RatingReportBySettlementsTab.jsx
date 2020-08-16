import React from 'react';
import './RatingReportBySettlementsTab.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../../../redux/actions/actions';
import formGenerator from '../../../../components/utilities/formGenerator';
import ratingReportBySettlementsFilterTemplate from './settings';
import UIElementTitle from '../../../../components/UIElementTitle/UIElementTitle';
import { getUsersOptions } from '../../../ZonePage/ZonePage';

function RatingReportBySettlementsTab(props) {
  const {
    filterForRatingReportBySettlements,
    tryGetRatingReportBySettlements,
    zones,
    zonesLoading,
    zoneInfo,
    zoneInfoLoading,
    subZones,
    subZonesLoading,
    subZoneInfo,
    subZoneInfoLoading,
    usersForZone,
    usersForZoneLoading,
    usersForSubZone,
    usersForSubZoneLoading,
    reportsStoreSetSubSection,
    reportsStoreGetRatingReportBySettlements,
    reportsStoreGetRatingReportBySettlementsCancel,
    zoneStoreGetZones,
    zoneStoreSetSection,
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
  } = props || {};

  const {
    fromDate,
    toDate,
    zoneName,
    zoneCode,
    subZoneName,
    subZoneCode,
    financeConsultId,
    supervisorId,
  } = filterForRatingReportBySettlements || {};

  const {
    users: zoneUsers,
  } = zoneInfo || {};

  const {
    users: subZoneUsers,
  } = subZoneInfo || {};

  const handleChangeValue = React.useCallback((editName, editValue) => {
    reportsStoreSetSubSection('filterForRatingReportBySettlements', { [editName]: editValue });
  }, [reportsStoreSetSubSection]);

  const handleGetReport = React.useCallback(() => {
    reportsStoreGetRatingReportBySettlements();
  }, [reportsStoreGetRatingReportBySettlements]);

  const zoneOptions = React.useMemo(() => {
    if (zones && Array.isArray(zones)) {
      return zones.map((v) => {
        const {
          id: thisId,
          regionTypeShort: thisRegionTypeShort,
          regionName: thisRegionName,
        } = v || {};
        return {
          value: thisId,
          label: `${thisRegionTypeShort ? `${thisRegionTypeShort} ` : ''}${thisRegionName || 'Неизвестное'}`,
        };
      });
    }
    return undefined;
  }, [zones]);

  const zoneCodeOptions = React.useMemo(() => {
    if (zones && Array.isArray(zones)) {
      return zones.map((v) => {
        const {
          id: thisId,
          code: thisCode,
        } = v || {};
        return {
          value: thisId,
          label: `${thisCode || 'Неизвестное'}`,
        };
      });
    }
    return undefined;
  }, [zones]);

  const subZoneOptions = React.useMemo(() => {
    if (subZones && Array.isArray(subZones)) {
      return subZones.map((v) => {
        const {
          id: thisId,
          cityName: thisCityName,
          cityTypeShort: thisCityTypeShort,
          settlementName: thisSettlementName,
          settlementTypeShort: thisSettlementTypeShort,
        } = v || {};
        return {
          value: thisId,
          label: `${thisCityTypeShort || thisSettlementTypeShort ? `${thisCityTypeShort || thisSettlementTypeShort} ` : ''}${thisCityName || thisSettlementName || 'Неизвестное'}`,
        };
      });
    }
    return undefined;
  }, [subZones]);

  const subZoneCodeOptions = React.useMemo(() => {
    if (subZones && Array.isArray(subZones)) {
      return subZones.map((v) => {
        const {
          id: thisId,
          subZoneCode: thisCode,
        } = v || {};
        return {
          value: thisId,
          label: `${thisCode || 'Неизвестное'}`,
        };
      });
    }
    return undefined;
  }, [subZones]);

  const filteredSupervisors = React.useMemo(
    () => getUsersOptions(zoneUsers || usersForZone),
    [zoneUsers, usersForZone],
  );

  const filteredFinanceConsults = React.useMemo(
    () => getUsersOptions(subZoneUsers || usersForSubZone),
    [subZoneUsers, usersForSubZone],
  );

  const editedTemplate = React.useMemo(() => {
    if (ratingReportBySettlementsFilterTemplate
      && Array.isArray(ratingReportBySettlementsFilterTemplate)
    ) {
      return ratingReportBySettlementsFilterTemplate.map((v) => {
        const { dataKey, otherProps } = v || {};
        if (dataKey === 'zoneName') {
          return {
            ...v,
            options: zoneOptions,
            otherProps: {
              ...otherProps,
              loading: zonesLoading,
            },
          };
        }
        if (dataKey === 'zoneCode') {
          return {
            ...v,
            options: zoneCodeOptions,
            otherProps: {
              ...otherProps,
              loading: zonesLoading,
            },
          };
        }
        if (dataKey === 'subZoneName') {
          return {
            ...v,
            options: subZoneOptions,
            otherProps: {
              ...otherProps,
              disabled: !(zoneName || zoneName === 0),
              loading: subZonesLoading,
            },
          };
        }
        if (dataKey === 'subZoneCode') {
          return {
            ...v,
            options: subZoneCodeOptions,
            otherProps: {
              ...otherProps,
              disabled: !(zoneName || zoneName === 0),
              loading: subZonesLoading,
            },
          };
        }
        if (dataKey === 'supervisorId') {
          return {
            ...v,
            options: filteredSupervisors,
            otherProps: {
              ...otherProps,
              loading: usersForZoneLoading,
            },
          };
        }
        if (dataKey === 'financeConsultId') {
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
    zoneName,
    zoneOptions,
    zonesLoading,
    zoneCodeOptions,
    subZoneOptions,
    subZonesLoading,
    subZoneCodeOptions,
    filteredSupervisors,
    usersForZoneLoading,
    filteredFinanceConsults,
    usersForSubZoneLoading,
  ]);

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    console.log('mount');
  }, []);
  /* ********************************************************** */

  /* ***************************** update ********************** */
  React.useEffect(() => {
    if (zoneName || zoneName === 0) {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { zoneCode: zoneName });
      zoneStoreGetZones({ key: 'subZone', zoneId: zoneName });
      zoneStoreGetZoneInfo({ key: 'zone', id: zoneName });
    } else {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', {
        zoneCode: undefined,
      });
      zoneStoreGetZoneInfoCancel();
      zoneStoreSetSection({ zoneInfo: undefined });
    }
  }, [
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
    zoneStoreSetSection,
    reportsStoreSetSubSection,
    zoneName,
    zoneStoreGetZones,
  ]);

  React.useEffect(() => {
    if (zoneCode || zoneCode === 0) {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { zoneName: zoneCode });
    } else {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { zoneName: undefined });
    }
  }, [reportsStoreSetSubSection, zoneCode]);

  React.useEffect(() => {
    if (subZoneName || subZoneName === 0) {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { subZoneCode: subZoneName });
      zoneStoreGetZoneInfo({ key: 'subZone', id: subZoneName });
    } else {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', {
        subZoneCode: undefined,
      });
      zoneStoreGetZoneInfoCancel();
      zoneStoreSetSection({ subZoneInfo: undefined });
    }
  }, [
    zoneStoreSetSection,
    reportsStoreSetSubSection,
    subZoneName,
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
  ]);

  React.useEffect(() => {
    if (subZoneCode || subZoneCode === 0) {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { subZoneName: subZoneCode });
    } else {
      reportsStoreSetSubSection('filterForRatingReportBySettlements', { subZoneName: undefined });
    }
  }, [reportsStoreSetSubSection, subZoneCode]);
  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    reportsStoreGetRatingReportBySettlementsCancel();
  }, [
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
