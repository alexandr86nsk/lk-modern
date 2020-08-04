/* ******************************* zoneStore  ********************************************** */
export const zoneStoreSetSection = (value) => ({
  type: 'ZONE_STORE_SET_SECTION',
  value,
});

export const zoneStoreSetSubSection = (name, value) => ({
  type: 'ZONE_STORE_SET_SUB_SECTION',
  name,
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

export const zoneStoreSetZonesTableStoreSection = (value) => ({
  type: 'ZONE_STORE_SET_ZONES_TABLE_STORE_SECTION',
  value,
});

export const zoneStoreSetZonesTableTemplateSection = (value) => ({
  type: 'ZONE_STORE_SET_ZONES_TABLE_TEMPLATE_SECTION',
  value,
});

export const zoneStoreGetZoneInfo = (value) => ({
  type: 'ZONE_STORE_GET_ZONE_INFO',
  value,
});

export const zoneStoreGetZoneInfoCancel = () => ({
  type: 'ZONE_STORE_GET_ZONE_INFO_CANCEL',
});

export const zoneStoreSetZoneInfoSection = (value) => ({
  type: 'ZONE_STORE_SET_ZONE_INFO_SECTION',
  value,
});

export const zoneStoreSaveZone = (value) => ({
  type: 'ZONE_STORE_SAVE_ZONE',
  value,
});

export const zoneStoreSaveZoneCancel = () => ({
  type: 'ZONE_STORE_SAVE_ZONE_CANCEL',
});

export const zoneStoreRemoveZone = (value) => ({
  type: 'ZONE_STORE_REMOVE_ZONE',
  value,
});

export const zoneStoreRemoveZoneCancel = () => ({
  type: 'ZONE_STORE_REMOVE_ZONE_CANCEL',
});

export const zoneStoreClearZoneInfo = () => ({
  type: 'ZONE_STORE_CLEAR_ZONE_INFO',
});
