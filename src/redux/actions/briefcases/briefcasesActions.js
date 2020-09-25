/* ************************** briefcasesStore  ******************************** */
export const briefcasesStoreSetSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_SECTION',
  value,
});

export const briefcasesStoreClear = () => ({
  type: 'BRIEFCASES_STORE_CLEAR',
});

export const briefcasesStoreGetBriefcases = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASES',
});

export const briefcasesStoreGetBriefcasesCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_BRIEFCASES_CANCEL',
});

export const briefcasesStoreStartBriefcase = (value) => ({
  type: 'BRIEFCASES_STORE_START_BRIEFCASE',
  value,
});

export const briefcasesStoreStartBriefcaseCancel = () => ({
  type: 'BRIEFCASES_STORE_START_BRIEFCASE_CANCEL',
});

export const briefcasesStoreStopBriefcase = (value) => ({
  type: 'BRIEFCASES_STORE_STOP_BRIEFCASE',
  value,
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

export const briefcasesStoreDeleteBriefcase = (value) => ({
  type: 'BRIEFCASES_STORE_DELETE_BRIEFCASE',
  value,
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

export const briefcasesStoreUpdateBriefcaseFile = (value, file) => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE_FILE',
  value,
  file,
});

export const briefcasesStoreUpdateBriefcaseFileCancel = () => ({
  type: 'BRIEFCASES_STORE_UPDATE_BRIEFCASE_FILE_CANCEL',
});

export const briefcasesStoreSetTableStoreSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_TABLE_STORE_SECTION',
  value,
});

export const briefcasesStoreSetTableTemplateSection = (value) => ({
  type: 'BRIEFCASES_STORE_SET_TABLE_TEMPLATE_SECTION',
  value,
});

export const briefcasesStoreGetMainSettings = (value) => ({
  type: 'BRIEFCASES_STORE_GET_MAIN_SETTINGS',
  value,
});

export const briefcasesStoreGetMainSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_MAIN_SETTINGS_CANCEL',
});

export const briefcasesStoreGetRecallSettings = (value) => ({
  type: 'BRIEFCASES_STORE_GET_RECALL_SETTINGS',
  value,
});

export const briefcasesStoreGetRecallSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_RECALL_SETTINGS_CANCEL',
});

export const briefcasesStoreGetTimeZoneSettings = (value) => ({
  type: 'BRIEFCASES_STORE_GET_TIME_ZONE_SETTINGS',
  value,
});

export const briefcasesStoreGetTimeZoneSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_GET_TIME_ZONE_SETTINGS_CANCEL',
});

export const briefcasesStoreChangeRecallSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_RECALL_SETTINGS',
  value,
});

export const briefcasesStoreChangeTimeZoneSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_TIME_ZONE_SETTINGS',
  value,
});

export const briefcasesStoreChangeMainSettings = (value) => ({
  type: 'BRIEFCASES_STORE_CHANGE_MAIN_SETTINGS',
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

export const briefcasesStoreSaveMainSettings = (value) => ({
  type: 'BRIEFCASES_STORE_SAVE_MAIN_SETTINGS',
  value,
});

export const briefcasesStoreSaveMainSettingsCancel = () => ({
  type: 'BRIEFCASES_STORE_SAVE_MAIN_SETTINGS_CANCEL',
});
