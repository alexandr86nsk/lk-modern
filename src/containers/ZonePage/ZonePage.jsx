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
    zoneStoreSetSection,
    zoneStoreGetZones,
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfo,
    zoneStoreGetZoneInfoCancel,
    zoneStoreGetUsers,
    zoneStoreGetUsersCancel,
    popUpStoreSetSection,
    modalStoreSetSection,
  } = props || {};

  const {
    regionName,
    regionTypeFull,
    users,
    code,
  } = zoneInfo || {};

  const handleEdit = React.useCallback((value) => {
    const { ZoneID } = value || {};
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor id={ZoneID} />,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

  const handleAdd = React.useCallback(() => {
    popUpStoreSetSection({
      show: true,
      component: <ZoneEditor />,
      hidePageControl: true,
      type: '--horizontal-right-25 --rounded',
    });
  }, [popUpStoreSetSection]);

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
  }, [
    zoneStoreGetZonesCancel,
    zoneStoreGetZoneInfoCancel,
    zoneStoreGetUsersCancel,
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
              <div className="zone-page__zone-info element-wrapper --fullscreen">
                {zoneInfoLoading && <UILoader text="Загружаем данные" dimmed />}
                <UIElementTitle title="Выбранная зона" />
                <div className="info">
                  {!zoneInfoLoading && zoneInfo && renderZoneInfo}
                </div>
                <div className="controls">
                  <Button
                    circular
                    basic
                    size="small"
                    onClick={handleAdd}
                  >
                    <Icon name="edit" />
                    Изменить
                  </Button>
                </div>
              </div>
            </div>
            <div className="zone-page__user-selector element-wrapper --fullscreen">
              <UIElementTitle title="Супервайзеры" />
              <UIReactSelect
                name="selectedZoneUser"
                title="Выберите пользователя"
                data={selectedZoneUser}
                type="--style-1c"
                options={zoneUsers}
                loading={zoneUsersLoading}
                callback={handleChangeValue}
              />
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
              Добавить
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
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ZonePage);
