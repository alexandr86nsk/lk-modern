/* ************************** briefcasesStore  ******************************** */
export const briefcasesStoreSetSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_SECTION',
  value,
});

export const briefcasesStoreClear = () => ({
  type: 'BRIEFCASES_STORE_CLEAR',
});

export const briefcaseItemStoreSetSection = (value) => ({
  type: 'BRIEFCASE_ITEM_STORE_SET_SECTION',
  value,
});

export const briefcaseItemStoreClear = () => ({
  type: 'BRIEFCASE_ITEM_STORE_CLEAR',
});

export const briefcasesStoreGetBriefcases = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASES',
});

export const briefcasesStoreGetBriefcasesCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASES_LIST_CANCEL',
});

export const briefcasesStoreStartBriefcase = (id) => ({
  type: 'BRIEFCASES_STORE_START_BRIEFCASE',
  id,
});

export const briefcasesStoreStartBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_START_BRIEFCASE_CANCEL',
});

export const briefcasesStoreStopBriefcase = (id) => ({
  type: 'BRIEFCASES_STORE_STOP_BRIEFCASE',
  id,
});

export const briefcasesStoreStopBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_STOP_BRIEFCASE_CANCEL',
});

export const briefcasesStoreAddBriefcase = (value) => ({
  type: 'BRIEFCASES_STORE_ADD_BRIEFCASE',
  value,
});

export const briefcasesStoreAddBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_ADD_BRIEFCASE_CANCEL',
});

export const briefcasesStoreDeleteBriefcase = (id) => ({
  type: 'BRIEFCASES_STORE_DELETE_BRIEFCASE',
  id,
});

export const briefcasesStoreDeleteBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_DELETE_BRIEFCASE_CANCEL',
});

export const briefcasesStoreUpdateBriefcase = (value) => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE',
  value,
});

export const briefcasesStoreUpdateBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE_CANCEL',
});

export const briefcasesStoreUpdateBriefcaseFile = (id, value) => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE_FILE',
  id,
  value,
});

export const briefcasesStoreUpdateBriefcaseFileCancel = () => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE_FILE_CANCEL',
});

export const briefcasesStoreGetBriefcase = (id) => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASE',
  id,
});

export const briefcasesStoreGetBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASE_CANCEL',
});

export const briefcasesStoreGetBriefcaseCalls = (id) => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASE_CALLS',
  id,
});

export const briefcasesStoreGetBriefcaseCallsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASE_CALLS_CANCEL',
});

export const briefcasesStoreSetTableStoreSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_TABLE_STORE_SECTION',
  value,
});

export const briefcasesStoreSetTableTemplateSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_TABLE_TEMPLATE_SECTION',
  value,
});

export const briefcasesStoreGetQueueAsteriskOptions = () => ({
  type: 'BRIEFCASES_STORE_GET_QUEUE_ASTERISK_OPTIONS',
});

export const briefcasesStoreGetQueueAsteriskOptionsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_QUEUE_ASTERISK_OPTIONS_CANCEL',
});

export const briefcasesStoreGetQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASES_STORE_GET_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcasesStoreGetQueueAsteriskSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_QUEUE_ASTERISK_SETTINGS_CANCEL',
});

export const briefcasesStoreChangeRecallSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_RECALL_SETTINGS',
  value,
});

export const briefcasesStoreChangeTimeZoneSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_TIME_ZONE_SETTINGS',
  value,
});

export const briefcasesStoreChangeQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcasesStoreSaveTimeZoneSettings = (value) => ({
  type: 'BRIEFCASES_STORE_SAVE_TIME_ZONE_SETTINGS',
  value,
});

export const briefcasesStoreSaveTimeZoneSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_SAVE_TIME_ZONE_SETTINGS_CANCEL',
});

export const briefcasesStoreSaveRecallSettings = (value) => ({
  type: 'BRIEFCASES_STORE_SAVE_RECALL_SETTINGS',
  value,
});

export const briefcasesStoreSaveRecallSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_SAVE_RECALL_SETTINGS_CANCEL',
});

export const briefcasesStoreSaveQueueAsteriskSettings = (value) => ({
  type: 'BRIEFCASES_STORE_SAVE_QUEUE_ASTERISK_SETTINGS',
  value,
});

export const briefcasesStoreSaveQueueAsteriskSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_SAVE_QUEUE_ASTERISK_SETTINGS_CANCEL',
});
