import React from 'react';
import './ZonePage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import UIElementTitle from '../../components/UIElementTitle/UIElementTitle';
import ZoneEditor from './common/ZoneEditor';
import UIBlockTitle from '../../components/UIBlockTitle/UIBlockTitle';
import UIReactSelect from '../../components/UIReactSelect/UIReactSelect';
import UILoader from '../../components/UILoader/UILoader';
import ZoneInfoItem from './common/ZoneInfoItem/ZoneInfoItem';
import stringFromData from '../../components/utilities/stringFromData';
import WarningIcon from '../../static/images/warning-24px.svg';
import ListItem from './common/ListItem';

function ZonePage__TRASH(props) {
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

  const renderZoneInfo = React.useMemo(() => (
    <>
      <ZoneInfoItem
        title="Зона:"
        value={stringFromData([regionTypeFull, regionName])}
      />
      <ZoneInfoItem
        title="Код:"
        value={code}
      />
      <ZoneInfoItem
        title="Кол-во супервайзеров:"
        value={users && Array.isArray(users) && users.length}
      />
    </>
  ), [code, users, regionTypeFull, regionName]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    zoneStoreSetSection({ [editName]: editValue });
  }, [zoneStoreSetSection]);

  const renderUsers = React.useMemo(() => {
    if (users && Array.isArray(users)) {
      return users.map((v) => {
        const { userID } = v || {};
        return (
          <ListItem
            key={userID}
            item={v}
            removeCallback={handleRemoveZoneUser}
          />
        );
      });
    }
    return null;
  }, [handleRemoveZoneUser, users]);

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
        <div className="element-wrapper">
          <UIElementTitle title="Зоны" />
          <div className="add-block">
            <Button
              circular
              primary
              size="small"
              onClick={handleAdd}
            >
              <Icon name="add" />
              Добавить зону
            </Button>
          </div>
          <div className="zone-page__zone">
            <div className="zone-page__zone-selector">
              <UIReactSelect
                name="selectedZone"
                title="Выберите зону"
                data={selectedZone}
                type="--style-1c"
                options={zones}
                loading={zonesLoading}
                callback={handleChangeValue}
              />
              <div className={`zone-page__zone-info flip-card${selectedZone ? ' active' : ''}`}>
                <div className="flip-card-inner element-wrapper --fullscreen">
                  <div className="flip-card-front">
                    {zoneInfoLoading && <UILoader text="Загружаем данные" dimmed />}
                    <UIElementTitle title="Выбранная зона" />
                    <div className="info">
                      {!zoneInfoLoading && renderZoneInfo}
                    </div>
                    <div className="controls">
                      <Button
                        circular
                        basic
                        size="tiny"
                        disabled={zoneInfoLoading}
                        onClick={handleAdd}
                      >
                        <Icon name="edit" />
                        Изменить
                      </Button>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <h5>Зона не выбрана</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={`zone-page__user-selector element-wrapper --fullscreen${selectedZone ? ' active' : ''}`}>
              <UIElementTitle title="Супервайзеры" />
              <div className="add-user">
                <UIReactSelect
                  name="selectedZoneUser"
                  title="Выберите пользователя"
                  data={selectedZoneUser}
                  type="--style-1c"
                  options={zoneUsers}
                  loading={zoneUsersLoading}
                  callback={handleChangeValue}
                />
                <Button
                  circular
                  positive
                  size="small"
                  disabled={zoneInfoLoading || !selectedZoneUser}
                  onClick={handleAddZoneUser}
                  loading={tryAddZoneUser}
                >
                  <Icon name="check" />
                  Назначить
                </Button>
              </div>
              <div className="list">
                {zoneInfoLoading && <UILoader text="Загружаем супервайзеров" dimmed />}
                <div className="list__body">
                  {!zoneInfoLoading && renderUsers}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-wrapper">
          <UIElementTitle title="Подзоны" />
          <div className="add-block">
            <Button
              circular
              primary
              size="small"
              onClick={handleAdd}
            >
              <Icon name="add" />
              Добавить подзону
            </Button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ZonePage__TRASH);
