import React from 'react';
import './ZonePage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import ZoneEditor from './common/ZoneEditor';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import stringFromData from '../../components/utilities/stringFromData';
import WarningIcon from '../../static/images/warning-24px.svg';
import Zone from './common/Zone';

function ZonePage(props) {
  const {
    zones,
    zonesLoading,
    selectedZone,
    zoneInfo,
    zoneInfoLoading,
    zoneUsers,
    zoneUsersLoading,
    selectedZoneUser,
    tryAddZoneUser,
    zoneStoreSetSection,
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    zoneStoreAddZoneUser,
    zoneStoreAddZoneUserCancel,
    zoneStoreRemoveZoneUser,
    zoneStoreRemoveZoneUserCancel,
    modalStoreSetSection,
    popUpStoreSetSection,
  } = props || {};

  const {
    regionName,
    regionTypeFull,
    users,
    id: zoneId,
    code,
  } = zoneInfo || {};

  /*  const handleEdit = React.useCallback((value) => {
    const { ZoneID } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor id={ZoneID} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]); */

  const removeZoneUser = React.useCallback((value) => {
    const { userID } = value || {};
    zoneStoreRemoveZoneUser(userID);
  }, [zoneStoreRemoveZoneUser]);

  const handleRemoveZoneUser = React.useCallback((value) => {
    const { fio: userFio } = value || {};
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете открепление ${userFio ? `пользователя "${userFio}"` : 'этого пользователя'} от зоны?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeZoneUser,
    });
  }, [modalStoreSetSection, removeZoneUser]);

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

  const handleAddZoneUser = React.useCallback(() => {
    zoneStoreAddZoneUser({
      zoneID: zoneId,
      users: [
        ...users.map((v) => {
          const { userID } = v || {};
          return userID;
        }),
        selectedZoneUser,
      ],
    });
  }, [users, selectedZoneUser, zoneId, zoneStoreAddZoneUser]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    zoneStoreSetSection({ [editName]: editValue });
  }, [zoneStoreSetSection]);

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    zoneStoreGetZones();
    zoneStoreGetUsers('zoneUsers');
    zoneStoreGetUsers('subZoneUsers');
  }, [
    zoneStoreGetZones,
    zoneStoreGetUsers,
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */
  React.useEffect(() => {
    if (selectedZone) {
      zoneStoreGetZoneInfo(selectedZone);
    } else {
      zoneStoreSetSection({
        zoneInfo: undefined,
      });
    }
  }, [
    selectedZone,
    zoneStoreGetZoneInfo,
    zoneStoreSetSection,
  ]);
  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreGetZoneInfoCancel();
    zoneStoreGetUsersCancel();
    zoneStoreAddZoneUserCancel();
    zoneStoreRemoveZoneUserCancel();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfoCancel,
    zoneStoreGetUsersCancel,
    zoneStoreAddZoneUserCancel,
    zoneStoreRemoveZoneUserCancel,
  ]);
  /* ********************************************************** */

  return (
    <div className="zone-page page__content">
      <UIBlockTitle title="Список зон" />
      <div className="zone-page__body">
        <Zone
          addZoneCallback={() => {}}
          addZoneUserCallback={handleAddZoneUser}
          removeZoneUserCallback={handleRemoveZoneUser}
          changeZoneCallback={() => {}}
          selectedZone={selectedZone}
          selectedZoneUser={selectedZoneUser}
          tryAddZoneUser={tryAddZoneUser}
          zones={zones}
          zonesLoading={zonesLoading}
          zoneUsers={zoneUsers}
          zoneUsersLoading={zoneUsersLoading}
          changeValueCallback={handleChangeValue}
          zoneInfoLoading={zoneInfoLoading}
          isZone
          users={users}
          code={code}
          name={stringFromData([regionTypeFull, regionName])}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  zones: state.zoneStore.zones,
  zonesLoading: state.zoneStore.zonesLoading,
  selectedZone: state.zoneStore.selectedZone,
  zoneInfo: state.zoneStore.zoneInfo,
  zoneInfoLoading: state.zoneStore.zoneInfoLoading,
  zoneUsers: state.zoneStore.zoneUsers,
  zoneUsersLoading: state.zoneStore.zoneUsersLoading,
  selectedZoneUser: state.zoneStore.selectedZoneUser,
  tryAddZoneUser: state.zoneStore.tryAddZoneUser,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZonePage);
