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
    usersForZone,
    usersForZoneLoading,
    selectedUserForZone,
    tryAddZoneUser,
    subZones,
    subZonesLoading,
    selectedSubZone,
    subZoneInfo,
    subZoneInfoLoading,
    usersForSubZone,
    usersForSubZoneLoading,
    selectedUserForSubZone,
    tryAddSubZoneUser,
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
    zoneStoreAddZoneUser,
    zoneStoreAddZoneUserCancel,
    zoneStoreRemoveZoneUser,
    zoneStoreRemoveZoneUserCancel,
    zoneStoreSetSection,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
    modalStoreSetSection,
    popUpStoreSetSection,
  } = props || {};

  const {
    regionName,
    regionTypeFull,
    users: zoneUsers,
    id: zoneId,
    code: zoneCode,
  } = zoneInfo || {};

  const {
    users: subZoneUsers,
    id: subZoneId,
    code: subZoneCode,
  } = subZoneInfo || {};

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
      id: zoneId,
      users: [
        ...usersForZone.map((v) => {
          const { userID } = v || {};
          return userID;
        }),
        selectedUserForSubZone,
      ],
    });
  }, [usersForZone, selectedUserForSubZone, zoneId, zoneStoreAddZoneUser]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    zoneStoreSetSection({ [editName]: editValue });
  }, [zoneStoreSetSection]);

  const subZoneClassName = React.useMemo(() => {
    if (selectedZone) {
      return 'sub-zone active';
    }
    return 'sub-zone';
  }, [selectedZone]);

  /* ***************************** mount ********************** */
  React.useEffect(() => {
    zoneStoreGetZones({ key: 'zone' });
    zoneStoreGetUsers({ key: 'zone' });
  }, [
    zoneStoreGetZones,
    zoneStoreGetUsers,
  ]);
  /* ********************************************************** */

  /* ***************************** update ********************** */
  React.useEffect(() => {
    if (selectedZone || selectedZone === 0) {
      zoneStoreGetZoneInfo({
        key: 'zone',
        id: selectedZone,
      });
      zoneStoreGetZones({
        key: 'subZone',
        zoneId: selectedZone,
      });
    } else {
      zoneStoreSetSection({
        zoneInfo: undefined,
      });
    }
  }, [
    selectedZone,
    zoneStoreGetZones,
    zoneStoreGetZoneInfo,
    zoneStoreSetSection,
  ]);

  React.useEffect(() => {
    if (selectedSubZone || selectedSubZone === 0) {
      zoneStoreGetZoneInfo({
        key: 'subZone',
        id: selectedSubZone,
      });
      zoneStoreGetUsers({ key: 'subZone' });
    } else {
      zoneStoreSetSection({
        subZoneInfo: undefined,
      });
    }
  }, [
    selectedSubZone,
    zoneStoreGetZoneInfo,
    zoneStoreGetUsers,
    zoneStoreSetSection,
  ]);
  /* ********************************************************** */

  /* ***************************** unmount ********************** */
  React.useEffect(() => () => {
    zoneStoreGetZonesCancel();
    zoneStoreGetZoneInfoCancel();
    zoneStoreAddZoneUserCancel();
    zoneStoreRemoveZoneUserCancel();
    zoneStoreGetUsersCancel();
    zoneStoreClear();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfoCancel,
    zoneStoreAddZoneUserCancel,
    zoneStoreRemoveZoneUserCancel,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
  ]);
  /* ********************************************************** */

  return (
    <div className="zone-page page__content">
      <UIBlockTitle title="Список зон" />
      <div className="zone-page__body">
        <Zone
          zones={zones}
          zonesLoading={zonesLoading}
          usersForZone={usersForZone}
          usersForZoneLoading={usersForZoneLoading}
          selectedUserForZone={selectedUserForZone}
          editZoneCallback={() => {}}
          changeValueCallback={handleChangeValue}
          selectedZone={selectedZone}
          zoneInfo={zoneInfo}
          zoneInfoLoading={zoneInfoLoading}
          code={zoneCode}
          name={stringFromData([regionTypeFull, regionName])}
          users={zoneUsers}
          addZoneCallback={() => {}}
          addZoneUserCallback={handleAddZoneUser}
          tryAddZoneUser={tryAddZoneUser}
          removeZoneUserCallback={handleRemoveZoneUser}
          isZone
        />
        <Zone
          className={subZoneClassName}
          zones={subZones}
          zonesLoading={subZonesLoading}
          usersForZone={usersForSubZone}
          usersForZoneLoading={usersForSubZoneLoading}
          selectedUserForZone={selectedUserForSubZone}
          editZoneCallback={() => {}}
          changeValueCallback={handleChangeValue}
          selectedZone={selectedSubZone}
          zoneInfoLoading={subZoneInfoLoading}
          code={subZoneCode}
          name={stringFromData([regionTypeFull, regionName])}
          users={subZoneUsers}
          addZoneCallback={() => {}}
          addZoneUserCallback={handleAddZoneUser}
          tryAddZoneUser={tryAddSubZoneUser}
          removeZoneUserCallback={handleRemoveZoneUser}
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
  usersForZone: state.zoneStore.usersForZone,
  usersForZoneLoading: state.zoneStore.usersForZoneLoading,
  selectedUserForZone: state.zoneStore.selectedUserForZone,
  tryAddZoneUser: state.zoneStore.tryAddZoneUser,
  subZones: state.zoneStore.subZones,
  subZonesLoading: state.zoneStore.subZonesLoading,
  selectedSubZone: state.zoneStore.selectedSubZone,
  subZoneInfo: state.zoneStore.subZoneInfo,
  subZoneInfoLoading: state.zoneStore.subZoneInfoLoading,
  usersForSubZone: state.zoneStore.usersForSubZone,
  usersForSubZoneLoading: state.zoneStore.usersForSubZoneLoading,
  selectedUserForSubZone: state.zoneStore.selectedUserForSubZone,
  tryAddSubZoneUser: state.zoneStore.tryAddZoneUser,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZonePage);
