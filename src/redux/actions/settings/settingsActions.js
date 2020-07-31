/* ******************************* settingsStore  ********************************************** */
export const settingsStoreSetSection = (value) => ({
  type: 'SETTINGS_STORE_SET_SECTION',
  value,
});

export const settingsStoreSetSubSection = (name, value) => ({
  type: 'SETTINGS_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const settingsStoreClear = () => ({
  type: 'SETTINGS_STORE_CLEAR',
});

export const settingsStoreGetSettings = () => ({
  type: 'SETTINGS_STORE_GET_SETTINGS',
});

export const settingsStoreGetSettingsCancel = () => ({
  type: 'SETTINGS_STORE_GET_SETTINGS_CANCEL',
});

export const settingsStoreUpdateSettings = (value) => ({
  type: 'SETTINGS_STORE_UPDATE_SETTINGS',
  value,
});

export const settingsStoreSaveSettings = (value) => ({
  type: 'SETTINGS_STORE_SAVE_SETTINGS',
  value,
});

export const settingsStoreSaveSettingsCancel = () => ({
  type: 'SETTINGS_STORE_SAVE_SETTINGS_CANCEL',
});

export const settingsStoreGetUsers = () => ({
  type: 'SETTINGS_STORE_GET_USERS',
});

export const settingsStoreGetUsersCancel = () => ({
  type: 'SETTINGS_STORE_GET_USERS_CANCEL',
});

export const settingsStoreSetUsersTableStoreSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USERS_TABLE_STORE_SECTION',
  value,
});

export const settingsStoreSetUsersTableTemplateSection = (value) => ({
  type: 'SETTINGS_STORE_SET_USERS_TABLE_TEMPLATE_SECTION',
  value,
});

export const settingsStoreGetUserInfo = (value) => ({
  type: 'SETTINGS_STORE_GET_USER_INFO',
  value,
});

export const settingsStoreGetUserInfoCancel = () => ({
  type: 'SETTINGS_STORE_GET_USER_INFO_CANCEL',
});

export const settingsStoreSetUserInfoSection = () => ({
  type: 'SETTINGS_STORE_SET_USER_INFO_SECTION',
});
