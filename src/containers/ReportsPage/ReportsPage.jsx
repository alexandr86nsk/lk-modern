import React from 'react';
import { connect } from 'react-redux';
import './ReportsPage.scss';
import actions from '../../redux/actions/actions';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UITab from '../../components/UITab/UITab';
import reportsTabs from './settings';

function ReportsPage(props) {
  const {
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
    modalStoreClear,
  } = props || {};

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    zoneStoreGetZones({ key: 'zone' });
    zoneStoreGetUsers({ key: 'zone' });
    zoneStoreGetUsers({ key: 'subZone' });
  }, [
    zoneStoreGetZones,
    zoneStoreGetUsers,
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */

  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreGetUsersCancel();
    zoneStoreClear();
    modalStoreClear();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
    modalStoreClear,
  ]);
  /* ********************************************************** */

  return (
    <div className="reports-page page__content">
      <UIBlockTitle title="Отчетность" />
      <UITab
        tabs={reportsTabs}
        renderActiveOnly
      />
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(ReportsPage);
