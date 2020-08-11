/* ******************************* zoneStore  ********************************************** */
export const zoneStoreSetSection = (value) => ({
  type: 'ZONE_STORE_SET_SECTION',
  value,
});

export const zoneStoreClear = () => ({
  type: 'ZONE_STORE_CLEAR',
});

export const zoneStoreGetZones = () => ({
  type: 'ZONE_STORE_GET_ZONES',
});

export const zoneStoreGetZonesCancel = () => ({
  type: 'ZONE_STORE_GET_ZONES_CANCEL',
});

export const zoneStoreGetUsers = (value) => ({
  type: 'ZONE_STORE_GET_USERS',
  value,
});

export const zoneStoreGetUsersCancel = () => ({
  type: 'ZONE_STORE_GET_USERS_CANCEL',
});

export const zoneStoreGetZoneInfo = (value) => ({
  type: 'ZONE_STORE_GET_ZONE_INFO',
  value,
});

export const zoneStoreGetZoneInfoCancel = () => ({
  type: 'ZONE_STORE_GET_ZONE_INFO_CANCEL',
});

export const zoneStoreSaveZone = (value) => ({
  type: 'ZONE_STORE_SAVE_ZONE',
  value,
});

export const zoneStoreSaveZoneCancel = () => ({
  type: 'ZONE_STORE_SAVE_ZONE_CANCEL',
});

export const zoneStoreAddZone = (value) => ({
  type: 'ZONE_STORE_ADD_ZONE',
  value,
});

export const zoneStoreAddZoneCancel = () => ({
  type: 'ZONE_STORE_ADD_ZONE_CANCEL',
});