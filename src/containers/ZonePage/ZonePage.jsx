import React from 'react';
import './ZonePage.scss';
import { connect } from 'react-redux';
import differenceBy from 'lodash/differenceBy';
import actions from '../../redux/actions/actions';
import ZoneEditor from './common/ZoneEditor';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import stringFromData from '../../components/utilities/stringFromData';
import WarningIcon from '../../static/images/warning-24px.svg';
import Zone from './common/Zone';

const getUserInfo = (res) => {
  if (res && Array.isArray(res)) {
    return res.map((v) => {
      const {
        userID,
        fio,
        phone,
      } = v || {};
      return {
        value: userID,
        label: `${fio || ''}${phone ? ` тел. ${phone}` : ''}`,
      };
    });
  }
  return undefined;
};

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
    popUpStoreClear,
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
    cityTypeFull,
    cityName,
    settlementTypeFull,
    settlementName,
  } = subZoneInfo || {};

  const handleAdd = React.useCallback((value) => {
    const isZone = value === 'zone';
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor isZone={isZone} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [
    popUpStoreSetSection,
  ]);

  const handleEdit = React.useCallback((value) => {
    const isZone = value === 'zone';
    popUpStoreSetSection({
      zoneInfoToEdit: isZone ? zoneInfo : subZoneInfo,
      show: true,
      component: <ZoneEditor isZone={isZone} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [zoneInfo, subZoneInfo, popUpStoreSetSection]);

  const removeZoneUser = React.useCallback((value) => {
    const { key, user } = value || {};
    const { userID } = user || {};
    const isZone = key === 'zone';
    const usr = isZone ? zoneUsers : subZoneUsers;
    let calcUsr = [];
    if (usr && Array.isArray(usr)) {
      calcUsr = usr.filter((v) => {
        const { userID: thisUserId } = v || {};
        return userID !== thisUserId;
      }).map((v) => {
        const { userID: thisUserId } = v || {};
        return thisUserId;
      });
    }
    zoneStoreRemoveZoneUser({
      key,
      id: isZone ? zoneId : subZoneId,
      users: [
        ...calcUsr,
      ],
    });
  }, [
    zoneUsers,
    subZoneUsers,
    zoneId,
    subZoneId,
    zoneStoreRemoveZoneUser,
  ]);

  const handleRemoveZoneUser = React.useCallback((value) => {
    const { user, key } = value || {};
    const { fio: userFio } = user || {};
    const isZone = key === 'zone';
    modalStoreSetSection({
      show: true,
      outputBody: {
        icon: <WarningIcon />,
        title: 'Важно',
        body: <div>{`Подтверждаете открепление ${userFio ? `пользователя "${userFio}"` : 'этого пользователя'} от данной ${isZone ? 'зоны' : 'подзоны'}?`}</div>,
      },
      data: value,
      asyncClose: true,
      callback: removeZoneUser,
    });
  }, [modalStoreSetSection, removeZoneUser]);

  const handleAddZoneUser = React.useCallback((key) => {
    const isZone = key === 'zone';
    const usr = isZone ? zoneUsers : subZoneUsers;
    let calcUsr = [];
    if (usr && Array.isArray(usr)) {
      calcUsr = usr.map((v) => {
        const { userID } = v || {};
        return userID;
      });
    }
    zoneStoreAddZoneUser({
      key,
      id: isZone ? zoneId : subZoneId,
      users: [
        ...calcUsr,
        isZone ? selectedUserForZone : selectedUserForSubZone,
      ],
    });
  }, [
    zoneUsers,
    subZoneUsers,
    selectedUserForZone,
    selectedUserForSubZone,
    zoneId,
    subZoneId,
    zoneStoreAddZoneUser,
  ]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    zoneStoreSetSection({ [editName]: editValue });
  }, [zoneStoreSetSection]);

  const subZoneClassName = React.useMemo(() => {
    if (selectedZone) {
      return 'sub-zone active';
    }
    return 'sub-zone';
  }, [selectedZone]);

  const filteredUsersForZone = React.useMemo(() => {
    if (usersForZone
      && Array.isArray(usersForZone)
      && zoneUsers
      && Array.isArray(zoneUsers)
    ) {
      const res = differenceBy(usersForZone, zoneUsers, 'userID');
      return getUserInfo(res);
    }
    return undefined;
  }, [usersForZone, zoneUsers]);

  const filteredUsersForSubZone = React.useMemo(() => {
    if (usersForSubZone
      && Array.isArray(usersForSubZone)
      && subZoneUsers
      && Array.isArray(subZoneUsers)
    ) {
      const res = differenceBy(usersForSubZone, subZoneUsers, 'userID');
      return getUserInfo(res);
    }
    return undefined;
  }, [usersForSubZone, subZoneUsers]);

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
    popUpStoreClear();
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfoCancel,
    zoneStoreAddZoneUserCancel,
    zoneStoreRemoveZoneUserCancel,
    zoneStoreGetUsersCancel,
    zoneStoreClear,
    popUpStoreClear,
  ]);
  /* ********************************************************** */

  return (
    <div className="zone-page page__content">
      <UIBlockTitle title="Список зон" />
      <div className="zone-page__body">
        <Zone
          zones={zones}
          zonesLoading={zonesLoading}
          usersForZone={filteredUsersForZone}
          usersForZoneLoading={usersForZoneLoading}
          selectedUserForZone={selectedUserForZone}
          editZoneCallback={handleEdit}
          changeValueCallback={handleChangeValue}
          selectedZone={selectedZone}
          zoneInfo={zoneInfo}
          zoneInfoLoading={zoneInfoLoading}
          code={zoneCode}
          name={stringFromData([regionTypeFull, regionName])}
          users={zoneUsers}
          addZoneCallback={handleAdd}
          addZoneUserCallback={handleAddZoneUser}
          tryAddZoneUser={tryAddZoneUser}
          removeZoneUserCallback={handleRemoveZoneUser}
          isZone
        />
        <Zone
          className={subZoneClassName}
          zones={subZones}
          zonesLoading={subZonesLoading}
          usersForZone={filteredUsersForSubZone}
          usersForZoneLoading={usersForSubZoneLoading}
          selectedUserForZone={selectedUserForSubZone}
          editZoneCallback={handleEdit}
          changeValueCallback={handleChangeValue}
          selectedZone={selectedSubZone}
          zoneInfoLoading={subZoneInfoLoading}
          code={subZoneCode}
          name={stringFromData([cityTypeFull, cityName, settlementTypeFull, settlementName])}
          users={subZoneUsers}
          addZoneCallback={handleAdd}
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
