import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    removeZoneCallback,
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

  const handleAddUser = React.useCallback(() => {
    addZoneUserCallback(isZone ? 'zone' : 'subZone');
  }, [isZone, addZoneUserCallback]);

  const handleRemoveUser = React.useCallback((value) => {
    removeZoneUserCallback({ key: isZone ? 'zone' : 'subZone', user: value });
  }, [isZone, removeZoneUserCallback]);

  return (
    <div className="container">
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
      <ul>
        <AnimatePresence initial={false}>
          {users && users.map((v, index) => (
            <motion.li
              key={index}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 20 }}
            >
              <ListItem
                item={v}
                removeCallback={handleRemoveUser}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
};

export default Zone;
