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
