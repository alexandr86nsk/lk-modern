import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import UIElementTitle from '../../../components/UIElementTitle/UIElementTitle';
import UIReactSelect from '../../../components/UIReactSelect/UIReactSelect';
import UILoader from '../../../components/UILoader/UILoader';
import ZoneInfoItem from './ZoneInfoItem/ZoneInfoItem';
import ListItem from './ListItem';

const Zone = (props) => {
  const {
    className,
    zones,
    zonesLoading,
    usersForZone,
    usersForZoneLoading,
    selectedUserForZone,
    editZoneCallback,
    changeValueCallback,
    selectedZone,
    zoneInfoLoading,
    code,
    name,
    users,
    addZoneCallback,
    addZoneUserCallback,
    tryAddZoneUser,
    removeZoneUserCallback,
    isZone,
  } = props || {};

  const renderZoneInfo = React.useMemo(() => (
    <>
      <ZoneInfoItem
        title={`${isZone ? 'Зона' : 'Подзона'}:`}
        value={name}
      />
      <ZoneInfoItem
        title="Код:"
        value={code}
      />
      <ZoneInfoItem
        title={`Кол-во ${isZone ? 'супервайзеров' : 'финансовых колсультантов'}:`}
        value={users && Array.isArray(users) && users.length}
      />
    </>
  ), [isZone, name, code, users]);

  const renderUsers = React.useMemo(() => {
    if (users && Array.isArray(users)) {
      return users.map((v) => {
        const { userID } = v || {};
        return (
          <ListItem
            key={userID}
            item={v}
            removeCallback={removeZoneUserCallback}
          />
        );
      });
    }
    return null;
  }, [removeZoneUserCallback, users]);

  const handleAddUser = React.useCallback(() => {
    addZoneUserCallback(isZone ? 'zone' : 'subZone');
  }, [isZone, addZoneUserCallback]);

  return (
    <div className={`zone${className ? ` ${className}` : ''}`}>
      <div className="element-wrapper --fullscreen">
        <UIElementTitle title={isZone ? 'Зоны' : 'Подзоны'} />
        <div className="add-block">
          <Button
            circular
            primary
            size="small"
            onClick={addZoneCallback}
          >
            <Icon name="add" />
            {`Добавить ${isZone ? 'зону' : 'подзону'}`}
          </Button>
        </div>
        <div className="zone-page__zone">
          <div className="zone-page__zone-selector">
            <UIReactSelect
              name={isZone ? 'selectedZone' : 'selectedSubZone'}
              title={`Выберите ${isZone ? 'зону' : 'подзону'}`}
              data={selectedZone}
              type="--style-1c"
              options={zones}
              loading={zonesLoading}
              callback={changeValueCallback}
              disabled={zoneInfoLoading}
            />
            <div className={`zone-page__zone-info flip-card${selectedZone ? ' active' : ''}`}>
              <div className="flip-card-inner element-wrapper --fullscreen">
                <div className="flip-card-front">
                  {zoneInfoLoading && <UILoader text="Загружаем данные" dimmed />}
                  <UIElementTitle title={`Выбранная ${isZone ? 'зона' : 'подзона'}`} />
                  <div className="info">
                    {!zoneInfoLoading && renderZoneInfo}
                  </div>
                  <div className="controls">
                    <Button
                      circular
                      basic
                      size="tiny"
                      disabled={zoneInfoLoading}
                      onClick={editZoneCallback}
                    >
                      <Icon name="edit" />
                      Изменить
                    </Button>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h5>{`${isZone ? 'Зона' : 'Подзона'} не выбрана`}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={`zone-page__user-selector element-wrapper --fullscreen${selectedZone ? ' active' : ''}`}>
            <UIElementTitle title={isZone ? 'Супервайзеры' : 'Финансовые консультанты'} />
            <div className="add-user">
              <UIReactSelect
                name={isZone ? 'selectedUserForZone' : 'selectedUserForSubZone'}
                title="Выберите пользователя"
                data={selectedUserForZone}
                type="--style-1c"
                options={usersForZone}
                loading={usersForZoneLoading}
                callback={changeValueCallback}
              />
              <Button
                circular
                positive
                size="small"
                disabled={zoneInfoLoading || !selectedUserForZone}
                onClick={handleAddUser}
                loading={tryAddZoneUser}
              >
                <Icon name="check" />
                Назначить
              </Button>
            </div>
            <div className="list">
              {zoneInfoLoading && <UILoader text={`Загружаем ${isZone ? 'супервайзеров' : 'фин.консультантов'}`} dimmed />}
              <div className="list__body">
                {!zoneInfoLoading && renderUsers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Zone);
