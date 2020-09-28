/* ******************************* SettingsStore  ********************************************** */
export const settingsStoreSetSection = (value) => ({
  type: 'SETTINGS_STORE_SET_SECTION',
  value,
});

export const settingsStoreSetSubSection = (name, value) => ({
  type: 'SETTINGS_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const settingsStoreChangeRecallItem = (id, value) => ({
  type: 'SETTINGS_STORE_CHANGE_RECALL_ITEM',
  id,
  value,
});

export const settingsStoreChangeTimeZoneItem = (value) => ({
  type: 'SETTINGS_STORE_CHANGE_TIME_ZONE_ITEM',
  value,
});

export const settingsStoreChangeQueuePhoneItem = (value) => ({
  type: 'SETTINGS_STORE_CHANGE_QUEUE_PHONE_ITEM',
  value,
});

export const settingsStoreClear = () => ({
  type: 'SETTINGS_STORE_CLEAR',
});

export const settingsStoreGetMain = () => ({
  type: 'SETTINGS_STORE_GET_MAIN',
});

export const settingsStoreGetMainCancel = () => ({
  type: 'SETTINGS_STORE_GET_MAIN_CANCEL',
});

export const settingsStoreGetRecall = () => ({
  type: 'SETTINGS_STORE_GET_RECALL',
});

export const settingsStoreGetRecallCancel = () => ({
  type: 'SETTINGS_STORE_GET_RECALL_CANCEL',
});

export const settingsStoreGetTimeZone = () => ({
  type: 'SETTINGS_STORE_GET_TIME_ZONE',
});

export const settingsStoreGetTimeZoneCancel = () => ({
  type: 'SETTINGS_STORE_GET_TIME_ZONE_CANCEL',
});

export const settingsStoreGetQueuePhone = () => ({
  type: 'SETTINGS_STORE_GET_QUEUE_PHONE',
});

export const settingsStoreGetQueuePhoneCancel = () => ({
  type: 'SETTINGS_STORE_GET_QUEUE_PHONE_CANCEL',
});

export const settingsStoreUpdateMain = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_MAIN',
  value,
});

export const settingsStoreUpdateMainCancel = () => ({
  type: 'SETTINGS_STORE_UPDATE_MAIN_CANCEL',
});

export const settingsStoreUpdateRecall = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_RECALL',
  value,
});

export const settingsStoreUpdateRecallCancel = () => ({
  type: 'SETTINGS_STORE_UPDATE_RECALL_CANCEL',
});

export const settingsStoreUpdateTimeZone = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_TIME_ZONE',
  value,
});

export const settingsStoreUpdateTimeZoneCancel = () => ({
  type: 'SETTINGS_STORE_UPDATE_TIME_ZONE_CANCEL',
});

export const settingsStoreUpdateQueuePhone = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_QUEUE_PHONE',
  value,
});

export const settingsStoreUpdateQueuePhoneCancel = () => ({
  type: 'SETTINGS_STORE_UPDATE_QUEUE_PHONE_CANCEL',
});
