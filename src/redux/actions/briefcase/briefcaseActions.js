/* ************************** briefcaseStore  ******************************** */
export const briefcaseListStoreSetSection = (value) => ({
  type: 'BRIEFCASE_LIST_STORE_SET_SECTION',
  value,
});

export const briefcaseListStoreClear = () => ({
  type: 'BRIEFCASE_LIST_STORE_CLEAR',
});

export const briefcaseItemStoreSetSection = (value) => ({
  type: 'BRIEFCASE_ITEM_STORE_SET_SECTION',
  value,
});

export const briefcaseItemStoreClear = () => ({
  type: 'BRIEFCASE_ITEM_STORE_CLEAR',
});

export const briefcaseStoreGetBriefcaseList = () => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE_LIST',
});

export const briefcaseStoreGetBriefcaseListCancel = () => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE_LIST_CANCEL',
});

export const briefcaseStoreStartBriefcase = (id) => ({
  type: 'BRIEFCASE_STORE_START_BRIEFCASE',
  id,
});

export const briefcaseStoreStartBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_START_BRIEFCASE_CANCEL',
});

export const briefcaseStoreStopBriefcase = (id) => ({
  type: 'BRIEFCASE_STORE_STOP_BRIEFCASE',
  id,
});

export const briefcaseStoreStopBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_STOP_BRIEFCASE_CANCEL',
});

export const briefcaseStoreAddBriefcase = (value) => ({
  type: 'BRIEFCASE_STORE_ADD_BRIEFCASE',
  value,
});

export const briefcaseStoreAddBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_ADD_BRIEFCASE_CANCEL',
});

export const briefcaseStoreDeleteBriefcase = (id) => ({
  type: 'BRIEFCASE_STORE_DELETE_BRIEFCASE',
  id,
});

export const briefcaseStoreDeleteBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_DELETE_BRIEFCASE_CANCEL',
});

export const briefcaseStoreUpdateBriefcase = (value) => ({
  type: 'BRIEFCASE_STORE_UPDATE_BRIEFCASE',
  value,
});

export const briefcaseStoreUpdateBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_UPDATE_BRIEFCASE_CANCEL',
});

export const briefcaseStoreUpdateBriefcaseFile = (id, value) => ({
  type: 'BRIEFCASE_STORE_UPDATE_BRIEFCASE_FILE',
  id,
  value,
});

export const briefcaseStoreUpdateBriefcaseFileCancel = () => ({
  type: 'BRIEFCASE_STORE_UPDATE_BRIEFCASE_FILE_CANCEL',
});

export const briefcaseStoreGetBriefcase = (id) => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE',
  id,
});

export const briefcaseStoreGetBriefcaseCancel = () => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE_CANCEL',
});

export const briefcaseStoreGetBriefcaseCalls = (id) => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE_CALLS',
  id,
});

export const briefcaseStoreGetBriefcaseCallsCancel = () => ({
  type: 'BRIEFCASE_STORE_GET_BRIEFCASE_CALLS_CANCEL',
});

export const briefcaseListStoreSetTableStoreSection = (value) => ({
  type: 'BRIEFCASE_LIST_STORE_SET_TABLE_STORE_SECTION',
  value,
});

export const briefcaseListStoreSetTableTemplateSection = (value) => ({
  type: 'BRIEFCASE_LIST_STORE_SET_TABLE_TEMPLATE_SECTION',
  value,
});

export const briefcaseListStoreGetQueueAsteriskOptions = () => ({
  type: 'BRIEFCASE_STORE_GET_QUEUE_ASTERISK_OPTIONS',
});

export const briefcaseListStoreGetQueueAsteriskOptionsCancel = () => ({
  type: 'BRIEFCASE_STORE_GET_QUEUE_ASTERISK_OPTIONS_CANCEL',
});

export const briefcaseStoreGetQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASE_STORE_GET_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcaseStoreGetQueueAsteriskSettingsCancel = () => ({
  type: 'BRIEFCASE_STORE_GET_QUEUE_ASTERISK_SETTINGS_CANCEL',
});

export const briefcaseStoreChangeRecallSettings = (value) => ({
  type: 'BRIEFCASE_STORE_CHANGE_RECALL_SETTINGS',
  value,
});

export const briefcaseStoreChangeTimeZoneSettings = (value) => ({
  type: 'BRIEFCASE_STORE_CHANGE_TIME_ZONE_SETTINGS',
  value,
});

export const briefcaseStoreChangeQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASE_STORE_CHANGE_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcaseStoreSaveTimeZoneSettings = (value) => ({
  type: 'BRIEFCASE_STORE_SAVE_TIME_ZONE_SETTINGS',
  value,
});

export const briefcaseStoreSaveTimeZoneSettingsCancel = () => ({
  type: 'BRIEFCASE_STORE_SAVE_TIME_ZONE_SETTINGS_CANCEL',
});

export const briefcaseStoreSaveRecallSettings = (value) => ({
  type: 'BRIEFCASE_STORE_SAVE_RECALL_SETTINGS',
  value,
});

export const briefcaseStoreSaveRecallSettingsCancel = () => ({
  type: 'BRIEFCASE_STORE_SAVE_RECALL_SETTINGS_CANCEL',
});

export const briefcaseStoreSaveQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASE_STORE_SAVE_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcaseStoreSaveQueueAsteriskSettingsCancel = () => ({
  type: 'BRIEFCASE_STORE_SAVE_QUEUE_ASTERISK_SETTINGS_CANCEL',
});
